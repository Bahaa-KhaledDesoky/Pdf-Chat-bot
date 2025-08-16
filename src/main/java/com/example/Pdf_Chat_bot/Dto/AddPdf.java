package com.example.Pdf_Chat_bot.Dto;

import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Chat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

public record AddPdf(


         String title,
         String text

) {
}
