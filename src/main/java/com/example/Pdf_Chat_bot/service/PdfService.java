package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.Dto.AddPdf;
import com.example.Pdf_Chat_bot.Dto.UserPdfs;
import com.example.Pdf_Chat_bot.exception.FileNotFoundException;
import com.example.Pdf_Chat_bot.exception.UserNotFoundException;
import com.example.Pdf_Chat_bot.mapping.PdfMapping;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.repository.PdfRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PdfService {
    private final PdfRepo pdfRepo;
    private final PdfMapping pdfMapping;
    private final UserService userService;
    public boolean AddPdf(AddPdf addPdf){
        Pdf pdf =pdfMapping.toPdf(addPdf,userService.getUser(addPdf.user()));
        pdfRepo.save(pdf);
        return true;
    }
    public List<UserPdfs> GetUserPdfs(Integer id){
        AppUser user =userService.getUser(id);
        return user.getPdfs().stream().map(pdfMapping::toUserPdf).collect(Collectors.toList());
    }
    public Pdf GetPdf(Integer id)
    {
        Pdf pdf=pdfRepo.findById(id).orElseThrow(()->new FileNotFoundException(id));
        return pdf;
    }
    public void DeletePdf(Integer id){
        GetPdf(id);
        pdfRepo.deleteById(id);
    }

}
