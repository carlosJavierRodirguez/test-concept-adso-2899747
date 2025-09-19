package com.example.Filmoteca.interactions.entity;

import com.example.Filmoteca.Content.entity.Movie;
import com.example.Filmoteca.Content.entity.Series;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "playlist_item", schema = "interactions")
@Schema(name = "playlist_item", description = "Entidad que representa un ítem dentro de una playlist")
public class PlaylistItem extends AuditableEntityInteractions {

    @Schema(description = "ID de la playlist", example = "1")
    @ManyToOne(optional = false)
    @JoinColumn(name = "playlist_id", referencedColumnName = "id")
    private Playlist playlist;

    @Schema(description = "ID de la película asociada", example = "1")
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

    @Schema(description = "ID de la serie asociada", example = "1")
    @ManyToOne
    @JoinColumn(name = "series_id", referencedColumnName = "id")
    private Series series;

}
