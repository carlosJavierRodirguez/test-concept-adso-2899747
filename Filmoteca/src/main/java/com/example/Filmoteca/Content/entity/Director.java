package com.example.Filmoteca.Content.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "director", schema = "content")
@Schema(name = "director", description = "Entidad que representa un director")
public class Director extends AuditableEntityContent {

    @Schema(description = "Nacionalidad del director", example = "Española")
    @Column(name = "nationality", nullable = true, length = 255)
    private String nationality;

}
