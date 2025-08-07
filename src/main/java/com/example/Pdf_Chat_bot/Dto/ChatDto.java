package com.example.Pdf_Chat_bot.Dto;

import com.example.Pdf_Chat_bot.model.Sender;

public record ChatDto(
      Integer id,
      String message,
      Sender sender
) {
}
