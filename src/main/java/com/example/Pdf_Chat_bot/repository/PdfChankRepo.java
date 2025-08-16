package com.example.Pdf_Chat_bot.repository;

import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.model.PdfChank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PdfChankRepo extends JpaRepository<PdfChank,Integer> {
    List<PdfChank> findAllByPdf_Id(Integer pdf);
}
