package com.example.Filmoteca.interactions.entity;

import com.example.Filmoteca.Content.entity.Movie;
import com.example.Filmoteca.Content.entity.Series;
import com.example.Filmoteca.users.entity.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "review", schema = "interactions")
@Schema(name = "review", description = "Entidad que representa una reseña de usuario")
public class Review extends AuditableEntityInteractions {

    @Schema(description = "Contenido de la reseña", example = "¡Excelente película!")
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Schema(description = "Calificación de la reseña", example = "5")
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Schema(description = "Fecha de la reseña", example = "2025-09-18")
    @Column(name = "date", nullable = false)
    private java.time.LocalDate date;

    @Schema(description = "ID del usuario que hizo la reseña", example = "1")
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Schema(description = "ID de la película reseñada", example = "1")
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

    @Schema(description = "ID de la serie reseñada", example = "1")
    @ManyToOne
    @JoinColumn(name = "series_id", referencedColumnName = "id")
    private Series series;

}
