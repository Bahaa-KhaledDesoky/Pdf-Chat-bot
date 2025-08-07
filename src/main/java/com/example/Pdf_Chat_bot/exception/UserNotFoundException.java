package com.example.Pdf_Chat_bot.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Integer id) {
        super("cant find this user that has this id:"+id);
    }
}
