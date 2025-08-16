package com.example.Pdf_Chat_bot.Dto;

import com.example.Pdf_Chat_bot.model.PdfChank;

public record ScoredChunk(

        PdfChank chunk,
        double score
) {
}
