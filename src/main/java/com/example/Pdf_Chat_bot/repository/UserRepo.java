package com.example.Pdf_Chat_bot.repository;


import com.example.Pdf_Chat_bot.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<AppUser,Integer> {
    Optional<AppUser> findByEmail(String email);
}
