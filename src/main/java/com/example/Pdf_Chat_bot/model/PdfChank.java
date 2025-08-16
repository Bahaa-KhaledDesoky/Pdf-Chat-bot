package com.example.Pdf_Chat_bot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name="chank",
        indexes = {
                @Index(name = "idx_pdf", columnList = "pdf")
        }
)

public class PdfChank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "LONGTEXT",nullable = false)
    private String text;
    @ManyToOne
    @JoinColumn(name="pdf")
    @JsonIgnore
    private Pdf pdf;

    @Column(columnDefinition = "LONGTEXT")
    private String embedding;


}
