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
        name = "app_user",
        indexes = {
                @Index(name = "idx_email", columnList = "email"),
                @Index(name = "idx_username", columnList = "username")
        }
)
public class AppUser{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false,unique = true)
    private String email;
    private String password;
    @Column(nullable = false,unique = true)
    private String username;
    private String openRouterKey;
    private String modelName;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL ,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Pdf> pdfs;
    }
