package com.example.Pdf_Chat_bot.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("cant find this user");
    }
}
