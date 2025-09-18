package com.example.Filmoteca.Content.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@lombok.EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "movie", schema = "content")
@Schema(name = "movie", description = "Entidad que representa una película")
public class Movie extends AuditableEntityContent {

    @Schema(description = "Año de estreno de la película", example = "2022")
    @Column(name = "release_year", nullable = false)
    private Integer releaseYear;

    @Schema(description = "Duración de la película en minutos", example = "120")
    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Schema(description = "Sinopsis de la película", example = "Una película sobre ...")
    @Column(name = "synopsis", nullable = false, length = 1000)
    private String synopsis;

    @Schema(description = "Director de la película")
    @ManyToOne(optional = false)
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director director;

    @Schema(description = "Género de la película")
    @ManyToOne(optional = false)
    @JoinColumn(name = "genre_id", referencedColumnName = "id")
    private Genre genre;
}
