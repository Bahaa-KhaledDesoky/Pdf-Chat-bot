package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.Dto.Login;
import com.example.Pdf_Chat_bot.Dto.SignUp;
import com.example.Pdf_Chat_bot.Dto.UserPdfs;
import com.example.Pdf_Chat_bot.exception.LoginException;
import com.example.Pdf_Chat_bot.exception.UserNotFoundException;
import com.example.Pdf_Chat_bot.mapping.PdfMapping;
import com.example.Pdf_Chat_bot.mapping.UserMapping;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final UserMapping userMapping;
    public AppUser getUser(Integer id){
            AppUser user=userRepo.findById(id).orElseThrow(()->new UserNotFoundException(id));
            return user;
    }


    public Integer SignUp(SignUp signUp){
        AppUser user =userMapping.toAppUser(signUp);
        return userRepo.save(user).getId();
    }
    public boolean Login(Login login){
        AppUser user= userRepo.findByEmail(login.email()).orElseThrow(()->new LoginException());
        if(login.password().equals(user.getPassword()))
            return true;
        throw new LoginException();

    }
}
