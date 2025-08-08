package com.example.Pdf_Chat_bot.controllers;

import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.Dto.ChatRequest;
import com.example.Pdf_Chat_bot.Dto.Message;
import com.example.Pdf_Chat_bot.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/chat")
@AllArgsConstructor
public class ChatController {

    private final ChatService chatService;
    @GetMapping("/GetAllChat")
    public ResponseEntity<?>  GetAllChat(@RequestBody ChatRequest chatRequest){
        List<ChatMessageDTO> chat= chatService.GetAllChat(chatRequest);
        return ResponseEntity.ok(chat);
    }
    @PostMapping("/getRespondFromAi")
    public ResponseEntity<?> getRespondFromAi(@RequestBody Message message ){
        String respond= chatService.getRespondFromAi( message );
        return ResponseEntity.ok(respond);
    }
}
