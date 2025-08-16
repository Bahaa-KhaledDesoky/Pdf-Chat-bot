package com.example.Pdf_Chat_bot.AIDtos;

import java.util.List;

public record ChatRequestDTO(String model, List<ChatMessageDTO> messages) {}