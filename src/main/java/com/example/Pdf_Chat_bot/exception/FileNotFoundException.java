package com.example.Pdf_Chat_bot.exception;

public class FileNotFoundException extends RuntimeException{
    public FileNotFoundException(Integer id) {
        super("cant find file with this id:"+id);
    }
}
