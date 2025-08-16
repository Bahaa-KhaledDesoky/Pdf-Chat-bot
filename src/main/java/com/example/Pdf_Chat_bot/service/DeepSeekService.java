package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.AIDtos.ChatRequestDTO;
import com.example.Pdf_Chat_bot.AIDtos.ChatResponseDTO;
import com.example.Pdf_Chat_bot.AIDtos.HuggingFaceRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class DeepSeekService {
    public DeepSeekService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    private final RestTemplate restTemplate;
    private final String DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions";
    @Value("${deepseek.api.key}")
    private String apiKey;


    public String getResponseFromDeepSeek(List<ChatMessageDTO> messages) {
        ChatRequestDTO requestDTO = new ChatRequestDTO("openai/gpt-oss-20b:free", messages);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        HttpEntity<ChatRequestDTO> request = new HttpEntity<>(requestDTO, headers);

        ResponseEntity<ChatResponseDTO> response = restTemplate.exchange(
                DEEPSEEK_API_URL,
                HttpMethod.POST,
                request,
                ChatResponseDTO.class
        );

        return response.getBody().choices().get(0).message().content();
    }
    public String huggingFaceRespond(String history,String chunks, String question){
        String baseUrl="https://bahaakhaled-flan-t5-small.hf.space/gradio_api/call/answer_question";
        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept","application/json");
        List<String> data=new ArrayList<>();
        data.add(history);
        data.add(chunks);
        data.add(question);
        HttpEntity<HuggingFaceRequest> httpEntity=new HttpEntity<>(new HuggingFaceRequest(data));
        ResponseEntity<String> response=restTemplate.exchange(
                baseUrl,
                HttpMethod.POST,
                httpEntity,
                String.class
        );
        return response.getBody();
    }
}