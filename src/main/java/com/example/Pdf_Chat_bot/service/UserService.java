package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.Dto.AddOpenRouter;
import com.example.Pdf_Chat_bot.Dto.Login;
import com.example.Pdf_Chat_bot.Dto.SignUp;
import com.example.Pdf_Chat_bot.exception.UserExistExciption;
import com.example.Pdf_Chat_bot.exception.UserNotFoundException;
import com.example.Pdf_Chat_bot.mapping.UserMapping;
import com.example.Pdf_Chat_bot.model.AppUser;
import com.example.Pdf_Chat_bot.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final UserMapping userMapping;
    public AppUser getUser(Integer id){
            AppUser user=userRepo.findById(id).orElseThrow(()->new UserNotFoundException());
            return user;
    }
    public Integer SignUp(SignUp signUp){
        boolean flag =  userExist(signUp.email());
        if(flag)
           throw new UserExistExciption();

        AppUser user = userMapping.toAppUser(signUp);
        return userRepo.save(user).getId();
    }
    private Boolean userExist(String email){
        Optional<AppUser> user= userRepo.findByEmail(email);
        if(user.isPresent())
            return true;
        return false;
    }
    public AppUser getUserByEmail(String email ){
        AppUser user= userRepo.findByEmail(email).orElseThrow(()->new UserNotFoundException());
        return user;
    }
    public Integer Login(Login login){
        AppUser user= getUserByEmail(login.email());
        if(login.password().equals(user.getPassword()))
            return user.getId();
        throw new UserNotFoundException();
    }
    public Boolean Model(AddOpenRouter openRouter){
        AppUser user= getUser(openRouter.userId());
        user.setModelName(openRouter.modelName());
        user.setOpenRouterKey(openRouter.apiKey());
        userRepo.save(user);
        return true;
    }
}
