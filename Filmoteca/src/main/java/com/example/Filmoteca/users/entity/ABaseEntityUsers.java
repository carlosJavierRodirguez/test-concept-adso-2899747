package com.example.Filmoteca.users.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class ABaseEntityUsers {

    @Schema(description = "Nombre del dato", example = "Juan Perez")
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    
}
