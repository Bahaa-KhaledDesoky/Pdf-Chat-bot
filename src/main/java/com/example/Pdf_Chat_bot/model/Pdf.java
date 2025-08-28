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
@Table(
        name = "pdf",
        indexes = {
                @Index(name = "idx_user",columnList = "user_id")
        }
)
public class Pdf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String text;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @OneToMany(mappedBy = "pdf",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Chat> chats;
    @OneToMany(mappedBy = "pdf",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PdfChank> chanks;
}
