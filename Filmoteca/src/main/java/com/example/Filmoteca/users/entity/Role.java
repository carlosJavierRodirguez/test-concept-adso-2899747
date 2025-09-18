package com.example.Filmoteca.users.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "role", schema = "users")
@Schema(name = "role", description = "Entidad que representa un rol de usuario")
public class Role extends AuditableEntityUsers {
    
    @Schema(description = "Descripción del rol", example = "Administrador del sistema")
    @Column(name = "description", nullable = true, length = 255)
    private String description;
    
     @Schema(description = "Nombre del usuario", example = "Juan Perez")
    @Column(name = "name", nullable = false, length = 100)
    private String name;
}
