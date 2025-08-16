package com.example.Pdf_Chat_bot.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(
        name = "chat",
        indexes = {
                @Index(name = "idx_pdf", columnList = "pdf_id")
        }
)
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "LONGTEXT")
    private String message;
    @Enumerated(EnumType.STRING)
    private Sender sender ;
    @ManyToOne
    @JoinColumn(name = "pdf_id")
    private Pdf pdf;
}
