package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.AIDtos.ChatRequestDTO;
import com.example.Pdf_Chat_bot.AIDtos.ChatResponseDTO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class DeepSeekService {
    public DeepSeekService(RestTemplate restTemplate)
    {
        this.restTemplate=restTemplate;
    }
    private final RestTemplate restTemplate;
    private final String DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions";
    @Value("${deepseek.api.key}")
    private String apiKey;
    public String getResponseFromDeepSeek(List<ChatMessageDTO> messages) {
        ChatRequestDTO requestDTO = new ChatRequestDTO("deepseek/deepseek-chat-v3-0324:free", messages);

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
}