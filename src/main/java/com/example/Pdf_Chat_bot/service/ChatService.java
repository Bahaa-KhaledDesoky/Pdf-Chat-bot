package com.example.Pdf_Chat_bot.service;
import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.Dto.*;
import com.example.Pdf_Chat_bot.mapping.ChatMapping;
import com.example.Pdf_Chat_bot.mapping.PdfMapping;
import com.example.Pdf_Chat_bot.model.*;
import com.example.Pdf_Chat_bot.repository.ChatRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatRepo chatRepo;
    private final PdfService pdfService;
    private final DeepSeekService deepSeekService;
    private final PdfMapping pdfMapping;
    private final ChatMapping chatMapping;

    private final EmbedService embedService;

    public List<ChatMessageDTO> GetAllChat(Integer pdf_id){
        Pdf pdf =pdfService.GetPdf(pdf_id);
        return chatRepo.findByPdf(pdf)
                .stream()
                .map(chatMapping::toChatDto).collect(Collectors.toList());
    }

    private void saveQA(String message, String respond,UserPdfs pdf){
        Chat userRequest =Chat.builder()
                .sender(Sender.user)
                .message(message)
                .pdf(pdfMapping.toPdf(pdf))
                .build();
        Chat aiRespond =Chat.builder()
                .sender(Sender.assistant)
                .message(respond)
                .pdf(pdfMapping.toPdf(pdf))
                .build();

        chatRepo.save(userRequest);
        chatRepo.save(aiRespond);

    }
    private String getChunkText(List<ChatMessageDTO> chats , Integer pdfId)
    {
        String message =chats.get(chats.size()-1).content();
        List<PdfChank> chanks;
        String chunksText="" ;
        try {
            chanks=getTopChanks(message ,pdfId);
            for(PdfChank chunk : chanks){
                chunksText+=chunk.getText();
            }
            return chunksText;
        }
        catch (Exception e)

        {
            throw new RuntimeException();
        }
    }
    private String OpenRouter(List<ChatMessageDTO> chats , UserPdfs pdf){
        String message =chats.get(chats.size()-1).content();
        String chunksText=getChunkText(chats ,pdf.id());
        AppUser user =pdfService.GetPdf(pdf.id()).getUser();
        chats.add(0,new ChatMessageDTO(Sender.system.toString(),"You are a helpful assistant that only" +
                " answers based on the content of the uploaded PDF only no thing else even if the user uploaded another text and " +
                "he cant uploade any thing direct to you if he want to chat another pdf he can uploade it on the web site and have its own chat." +
                " Do not use any other knowledge.the title of the book is "+pdf.title()+" . The PDF contains" +
                " the following chunks: "+chunksText ));
        String respond =deepSeekService.getResponseFromDeepSeek(chats,user.getModelName(),user.getOpenRouterKey());
        saveQA(message,respond,pdf);
        return respond;
    }
    private String huggingFace(List<ChatMessageDTO> chats , UserPdfs pdf){
        String message =chats.get(chats.size()-1).content();
        String chunksText=getChunkText(chats ,pdf.id());

        chats.add(0,new ChatMessageDTO(Sender.system.toString(),"You are a helpful assistant that" +
                " answers based on the content. the title of the file is "+pdf.title()));
        String chatText="";
        for(ChatMessageDTO messageDTO :chats){
            chatText+=" "+messageDTO.role()+" : "+messageDTO.content()+"/n";
        }
        String respond =deepSeekService.huggingFaceRespond(chatText,chunksText,message);
        saveQA(message,respond,pdf);
        return respond;

    }
    public String getRespondFromAi(List<ChatMessageDTO> chats , UserPdfs pdf,Boolean flag){
        if(flag)
            return OpenRouter(chats,pdf);
        else
            return huggingFace(chats,pdf);
    }
    public List<PdfChank> getTopChanks(String message , Integer pdf_id) throws JsonProcessingException {

        ObjectMapper mapper=new ObjectMapper();
        List<PdfChank> pdfChanks =pdfService.GetPdfChank(pdf_id);

        List<String> messageList =new LinkedList<>();
        messageList.add(message);

        List<List<Double>>question_embed = embedService.getEmbeddings(messageList);
        List<ScoredChunk> scoredChunks = new LinkedList<>();
        for(int i=0;i<pdfChanks.size();i++)
        {
            PdfChank pdfChank =pdfChanks.get(i);
            List<Double> embeding = mapper.readValue(pdfChank.getEmbedding(), new TypeReference<List<Double>>() {});
            Double score= embedService.cosineSimilarity(question_embed.get(0),embeding);
            scoredChunks.add(new ScoredChunk(pdfChank,score));
        }
        scoredChunks.sort((a, b) -> Double.compare(b.score(), a.score()));

        // 5) Return top 5
        return scoredChunks.stream()
                .limit(5)
                .map(sc -> sc.chunk())
                .toList();

    }

}
