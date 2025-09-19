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
@Table(name = "series", schema = "content")
@Schema(name = "series", description = "Entidad que representa una serie")
public class Series extends AuditableEntityContent {

    @Schema(description = "Número de temporadas de la serie", example = "5")
    @Column(name = "seasons", nullable = false)
    private Integer seasons;

    @Schema(description = "Sinopsis de la serie", example = "Una serie sobre ...")
    @Column(name = "synopsis", nullable = false, length = 1000)
    private String synopsis;

    @Schema(description = "Director de la serie")
    @ManyToOne(optional = false)
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director director;

    @Schema(description = "Género de la serie")
    @ManyToOne(optional = false)
    @JoinColumn(name = "genre_id", referencedColumnName = "id")
    private Genre genre;
}
