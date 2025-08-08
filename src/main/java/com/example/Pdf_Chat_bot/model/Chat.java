package com.example.Pdf_Chat_bot.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "LONGTEXT")
    private String message;
    @Enumerated(EnumType.STRING)
    private Sender sender ;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "pdf_id")
    private Pdf pdf;
}
