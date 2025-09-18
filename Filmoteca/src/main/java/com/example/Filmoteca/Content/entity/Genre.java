package com.example.Filmoteca.Content.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "genre", schema = "content")
@Schema(name = "genre", description = "Entidad que representa un género")
public class Genre extends AuditableEntityContent {

    @Schema(description = "Descripción del género", example = "Acción")
    @Column(name = "description", nullable = true, length = 255)
    private String description;
    
}
