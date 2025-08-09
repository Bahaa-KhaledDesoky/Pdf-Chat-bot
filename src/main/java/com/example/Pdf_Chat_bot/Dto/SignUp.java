package com.example.Pdf_Chat_bot.Dto;

import com.example.Pdf_Chat_bot.model.Chat;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

public record SignUp(
         String email,
         String username,
         String password

) {
}
