package com.example.Pdf_Chat_bot.controllers;

import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.Dto.*;
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
    @GetMapping("/GetAllChat/{pdf_id}")
    public ResponseEntity<?>  GetAllChat(@PathVariable Integer pdf_id){
        List<ChatMessageDTO> chat= chatService.GetAllChat(pdf_id);
        return ResponseEntity.ok(chat);
    }
    @PostMapping("/getRespondFromAi")
    public ResponseEntity<?> getRespondFromAi(@RequestBody SendMessage message ){
        String respond= chatService.getRespondFromAi( message.chats() ,message.pdf(),message.flag() );
        return ResponseEntity.ok(respond);
    }
}
