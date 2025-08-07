package com.example.Pdf_Chat_bot.controllers;

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
    @GetMapping("/Login")
    public ResponseEntity<?> Login(Login login){

        Boolean flag=userService.Login(login);
        return ResponseEntity.ok(flag);

    }



}
