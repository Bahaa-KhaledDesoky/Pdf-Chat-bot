package com.example.Pdf_Chat_bot.mapping;

import com.example.Pdf_Chat_bot.AIDtos.ChatMessageDTO;
import com.example.Pdf_Chat_bot.Dto.Message;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Chat;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.model.Sender;
import org.springframework.stereotype.Component;

@Component
public class ChatMapping {
    public ChatMessageDTO toChatDto(Chat chat){
        return new ChatMessageDTO(
                chat.getSender().toString(),
                chat.getMessage()
        );
    }
    public Chat toChat(Message message, Pdf pdf, AppUser user)
    {
        return Chat.builder()
                .sender(Sender.user)
                .pdf(pdf)
                .message(message.message())
                .build();
    }
}
