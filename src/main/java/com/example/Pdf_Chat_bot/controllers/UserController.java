package com.example.Pdf_Chat_bot.controllers;

import com.example.Pdf_Chat_bot.Dto.AddOpenRouter;
import com.example.Pdf_Chat_bot.Dto.Login;
import com.example.Pdf_Chat_bot.Dto.SignUp;
import com.example.Pdf_Chat_bot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/SignUp")
    public ResponseEntity<?> SignUp(@RequestBody SignUp signUp){
        Integer id=userService.SignUp(signUp);
        return ResponseEntity.ok(id) ;
    }
    @PostMapping("/Login")
    public ResponseEntity<?> Login(@RequestBody Login login){

        Integer flag=userService.Login(login);
        return ResponseEntity.ok(flag);

    }
    @PostMapping("/model")
    public ResponseEntity<?> Model(@RequestBody AddOpenRouter openRouter){
        Boolean flag=userService.Model(openRouter);
        return ResponseEntity.ok(flag);
    }
}
