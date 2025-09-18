package com.example.Filmoteca.interactions.entity;

import com.example.Filmoteca.users.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "playlist", schema = "interactions")
@Schema(name = "playlist", description = "Entidad que representa una lista de reproducción de usuario")
public class Playlist extends AuditableEntityInteractions {

    @Schema(description = "Nombre del dato", example = "Juan Perez")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Schema(description = "ID del usuario propietario de la playlist", example = "1")
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
