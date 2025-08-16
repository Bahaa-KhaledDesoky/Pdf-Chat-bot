package com.example.Pdf_Chat_bot.repository;

import com.example.Pdf_Chat_bot.model.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfRepo extends JpaRepository<Pdf,Integer> {
}
