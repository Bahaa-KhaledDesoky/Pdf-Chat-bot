package com.example.Pdf_Chat_bot.controllers;

import com.example.Pdf_Chat_bot.Dto.UserPdfs;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.service.PdfService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/pdf")
@AllArgsConstructor
public class PdfController {
    private final PdfService pdfService;
    @PostMapping("/AddPdf")
    public ResponseEntity<?> AddPdf(@RequestParam("file") MultipartFile file,@RequestParam("userId") Integer userId ,@RequestParam("title") String title){

        boolean flag =pdfService.AddPdf(file, userId ,title);
        return ResponseEntity.ok(flag);
    }
    @GetMapping("/GetUserPdfs/{id}")
    public ResponseEntity<?> GetUserPdfs(@PathVariable Integer id){
        List<UserPdfs> list=pdfService.GetUserPdfs( id);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/GetPdf")
    public ResponseEntity<?> GetPdf(Integer id)
    {
        Pdf pdf=pdfService.GetPdf(id);
        return ResponseEntity.ok(pdf);
    }
    @DeleteMapping("/DeletePdf/{id}")
    public ResponseEntity<?> DeletePdf(@PathVariable Integer id){
        boolean flag=pdfService.DeletePdf( id);
        return ResponseEntity.ok(flag);
    }

}
