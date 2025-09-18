package com.example.Filmoteca.users.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "user", schema = "users")
@Schema(name = "user", description = "Entidad que representa un usuario")
public class User extends AuditableEntityUsers {
    @Schema(description = "Nombre del usuario", example = "Juan Perez")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Schema(description = "Correo electrónico del usuario", example = "usuario@ejemplo.com")
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Schema(description = "Hash de la contraseña", example = "$2a$10$...")
    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @OneToOne(optional = false)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;
}
