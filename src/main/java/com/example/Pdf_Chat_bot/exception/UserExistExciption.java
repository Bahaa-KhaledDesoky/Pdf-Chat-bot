package com.example.Pdf_Chat_bot.exception;

public class UserExistExciption extends RuntimeException{
    public UserExistExciption() {
        super("user already exist");
    }
}
