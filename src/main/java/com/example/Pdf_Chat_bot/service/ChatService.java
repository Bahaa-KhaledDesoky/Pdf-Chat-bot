package com.example.Pdf_Chat_bot.service;
import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.Dto.ChatDto;
import com.example.Pdf_Chat_bot.Dto.ChatRequest;
import com.example.Pdf_Chat_bot.Dto.Message;
import com.example.Pdf_Chat_bot.mapping.ChatMapping;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Chat;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.model.Sender;
import com.example.Pdf_Chat_bot.repository.ChatRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatRepo chatRepo;
    private final UserService userService;
    private final PdfService pdfService;
    private final DeepSeekService deepSeekService;

    private final ChatMapping chatMapping;
    public List<ChatMessageDTO> GetAllChat(ChatRequest chatRequest){
        AppUser user =userService.getUser(chatRequest.user());
        Pdf pdf =pdfService.GetPdf(chatRequest.pdf());
        return chatRepo.findByUserAndPdf(user,pdf)
                .stream()
                .map(chatMapping::toChatDto).collect(Collectors.toList());
    }
    public Integer AddMessage(Message message){
        AppUser user=userService.getUser(message.user());
        Pdf pdf =pdfService.GetPdf(message.pdf());
        Chat chat = chatMapping.toChat(message,pdf,user);
        return chatRepo.save(chat).getId();
    }
    public String getRespondFromAi(Message message ){
        AppUser user=userService.getUser(message.user());
        Pdf pdf =pdfService.GetPdf(message.pdf());
        List<ChatMessageDTO> chats = GetAllChat(new ChatRequest(user.getId(), pdf.getId()));
        chats.add(0,new ChatMessageDTO(Sender.system.toString(),"You are a helpful assistant that only" +
                " answers based on the content of the uploaded PDF." +
                " Do not use any other knowledge.the title of the book is "+pdf.getTitle()+" . The PDF contains" +
                " the following information: "+pdf.getText() ));
        chats.add(new ChatMessageDTO(Sender.system.toString(),message.message()));
        String respond =deepSeekService.getResponseFromDeepSeek(chats);
        Chat userRequest =Chat.builder()
                .sender(Sender.user)
                .message(message.message())
                .user(user)
                .pdf(pdf)
                .build();
        Chat aiRespond =Chat.builder()
                .sender(Sender.assistant)
                .message(respond)
                .user(user)
                .pdf(pdf)
                .build();

        chatRepo.save(userRequest);
        chatRepo.save(aiRespond);
        return respond;
    }
}
