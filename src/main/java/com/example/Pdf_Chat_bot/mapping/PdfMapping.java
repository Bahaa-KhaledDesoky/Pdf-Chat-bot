package com.example.Pdf_Chat_bot.mapping;

import com.example.Pdf_Chat_bot.Dto.AddPdf;
import com.example.Pdf_Chat_bot.Dto.UserPdfs;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Pdf;
import org.springframework.stereotype.Component;

@Component
public class PdfMapping {
    public Pdf toPdf(AddPdf addPdf, AppUser user){
        return Pdf.builder()
                .title(addPdf.title())
                .text(addPdf.text())
                .user(user)
                .build();
    }

    public UserPdfs toUserPdf(Pdf pdf){
        return new UserPdfs(pdf.getId(),pdf.getTitle()) ;
    }
    public Pdf toPdf(UserPdfs pdf){
        return Pdf.builder()
                .id(pdf.id())
                .build();
    }
}
