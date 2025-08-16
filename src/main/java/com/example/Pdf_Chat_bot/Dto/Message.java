package com.example.Pdf_Chat_bot.Dto;

import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.model.Sender;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public record Message(
         String message,
         Integer user,
         Integer pdf

) {
}
