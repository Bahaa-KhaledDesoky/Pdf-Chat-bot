package com.example.Pdf_Chat_bot.exception;

public class PdfReadingException extends RuntimeException{
    public PdfReadingException() {
        super("Error will reading the file try again later");
    }
}
