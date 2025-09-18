package com.example.Filmoteca.users.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "profile", schema = "users")
@Schema(name = "profile", description = "Entidad que representa un perfil de usuario")
public class Profile extends AuditableEntityUsers {

    @Schema(description = "URL del avatar del usuario", example = "https://ejemplo.com/avatar.png")
    @Column(name = "avatar_url", nullable = true, length = 255)
    private String avatarUrl;

    @Schema(description = "Preferencias del usuario en formato JSON", example = "{\"theme\":\"dark\"}")
    @Column(name = "preferences", nullable = true, columnDefinition = "TEXT")
    private String preferences;

    @Schema(description = "País del usuario", example = "Colombia")
    @Column(name = "country", nullable = true, length = 100)
    private String country;
    
}
