package com.example.Pdf_Chat_bot.Dto;

import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public record SendMessage (
        List<ChatMessageDTO> chats , UserPdfs pdf,Boolean flag
) {
}
