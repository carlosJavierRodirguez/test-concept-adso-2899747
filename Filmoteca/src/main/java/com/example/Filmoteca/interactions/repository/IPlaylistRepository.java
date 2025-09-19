package com.example.Filmoteca.interactions.repository;

import com.example.Filmoteca.interactions.entity.Playlist;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlaylistRepository extends IBaseRepositoryInteractions<Playlist, String> {
    // Métodos personalizados si es necesario
}
