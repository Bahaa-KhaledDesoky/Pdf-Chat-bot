package com.example.Pdf_Chat_bot.exception;

public class LoginException extends RuntimeException{
    public LoginException() {
        super("Wrong email or password");
    }
}
