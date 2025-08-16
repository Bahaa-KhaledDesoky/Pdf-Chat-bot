package com.example.Pdf_Chat_bot.mapping;

import com.example.Pdf_Chat_bot.Dto.SignUp;
import com.example.Pdf_Chat_bot.model.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserMapping {
    public AppUser toAppUser(SignUp signUp){
        return AppUser.builder()
                .email(signUp.email())
                .username(signUp.username())
                .password(signUp.password())
                .build();
    }
}
