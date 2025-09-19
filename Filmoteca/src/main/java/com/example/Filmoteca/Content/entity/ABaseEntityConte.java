package com.example.Filmoteca.Content.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class ABaseEntityConte {
    @Schema(description = "Nombre del dato", example = "Airbus A320")
    @Column(name = "name", nullable = false, length = 100)
    private String name;
}
