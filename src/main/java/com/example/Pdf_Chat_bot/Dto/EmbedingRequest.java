package com.example.Pdf_Chat_bot.Dto;

import java.util.List;

public record EmbedingRequest(
        List<EmbedingDate> data
) {
}
