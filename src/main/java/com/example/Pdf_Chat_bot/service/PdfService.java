package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.Dto.AddPdf;
import com.example.Pdf_Chat_bot.Dto.UserPdfs;
import com.example.Pdf_Chat_bot.exception.FileExistExeption;
import com.example.Pdf_Chat_bot.exception.FileNotFoundException;
import com.example.Pdf_Chat_bot.exception.PdfReadingException;
import com.example.Pdf_Chat_bot.mapping.PdfMapping;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.model.Pdf;
import com.example.Pdf_Chat_bot.model.PdfChank;
import com.example.Pdf_Chat_bot.repository.PdfChankRepo;
import com.example.Pdf_Chat_bot.repository.PdfRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

@Service
@AllArgsConstructor
public class PdfService {
    private final PdfRepo pdfRepo;
    private final PdfChankRepo pdfChankRepo;
    private final PdfMapping pdfMapping;
    private final UserService userService;
    private final EmbedService embedService;


    public String OcrPdf(PDDocument document) {
       try {
           StringBuilder stringBuilder=new StringBuilder();
           PDFRenderer pdfRenderer=new PDFRenderer(document);
           ITesseract tesseract=new Tesseract();
           tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata");
           tesseract.setLanguage("eng");
           for(int i=0;i<document.getNumberOfPages();i++)
           {
               BufferedImage bufferedImage=pdfRenderer.renderImageWithDPI(i,300);
               String result=tesseract.doOCR(bufferedImage);
               stringBuilder.append(result).append("\n");
           }
           return stringBuilder.toString();
       }
       catch (IOException | TesseractException e){
           throw new OcrException();
       }

    }
    @Transactional
    public boolean AddPdf(MultipartFile file,Integer userId ,String title){
        try {
            List<UserPdfs> pdfs =GetUserPdfs(userId);
            boolean exists = pdfs.stream()
                    .anyMatch(pdf -> pdf.title().equals(title));
            if(exists)
            {
                throw new FileExistExeption(title+" : is already exist ");
            }
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            if(text.trim().isEmpty())
            {
                text=OcrPdf(document);
            }
            document.close();
            AppUser user =userService.getUser(userId);
            Pdf pdf=pdfMapping.toPdf(new AddPdf(title,text),user);
            pdf = pdfRepo.save(pdf);
            createChanks(pdf);
            return true;
        } catch (Exception e) {
            throw new PdfReadingException();
        }
    }
    private void createChanks(Pdf pdf) throws JsonProcessingException {
        String text =pdf.getText();
        ObjectMapper mapper = new ObjectMapper();
        if (text == null || text.isEmpty()) {
            throw new RuntimeException() ;
        }
        List<String> chunks =new LinkedList<>();
        int start = 0;
        while (start < text.length()) {
            int end = Math.min(start + 800, text.length());
            String chunk = text.substring(start, end).trim();
            chunks.add(chunk);
            if (end == text.length()) {
                break; // last chunk
            }
            // Move start forward with overlap
            start += (800 - 100);
        }

        List<List<Double>> embedings= embedService.getEmbeddings(chunks);

        for(int i=0;i<chunks.size();i++)
        {
            String embeddingJson = mapper.writeValueAsString(embedings.get(i));

            PdfChank pdfChank =PdfChank.builder()
                    .text(chunks.get(i))
                    .pdf(pdf)
                    .embedding(embeddingJson)
                    .build();
            pdfChankRepo.save(pdfChank);
        }

    }
    public List<UserPdfs> GetUserPdfs(Integer id){
        AppUser user =userService.getUser(id);
        return user.getPdfs().stream().map(pdfMapping::toUserPdf).collect(Collectors.toList());
    }
    public List<PdfChank> GetPdfChank(Integer id)
    {
        List<PdfChank> pdfChanks = pdfChankRepo.findAllByPdf_Id(id);
        return pdfChanks;
    }

    public Pdf GetPdf(Integer id)
    {
        Pdf pdf=pdfRepo.findById(id).orElseThrow(()->new FileNotFoundException(id));
        return pdf;
    }
    public boolean DeletePdf(Integer id){
        GetPdf(id);
        pdfRepo.deleteById(id);
        return true;
    }


}
