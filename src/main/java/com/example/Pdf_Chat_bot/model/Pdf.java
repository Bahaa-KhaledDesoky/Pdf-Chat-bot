package com.example.Pdf_Chat_bot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pdf {
    @Id
    private Integer id;
    private String title;
    private String text;
    @ManyToOne
    @JoinColumn(name = "user_id")

    private AppUser user;
    @OneToMany(mappedBy = "pdf",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Chat> chats;
}
