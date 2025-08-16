package com.example.Pdf_Chat_bot.repository;

import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Chat;
import com.example.Pdf_Chat_bot.model.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepo extends JpaRepository<Chat,Integer> {
    List<Chat> findByPdf( Pdf pdf);
}
