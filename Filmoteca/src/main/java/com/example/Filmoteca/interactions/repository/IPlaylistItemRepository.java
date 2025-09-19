package com.example.Filmoteca.interactions.repository;

import com.example.Filmoteca.interactions.entity.PlaylistItem;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlaylistItemRepository extends IBaseRepositoryInteractions<PlaylistItem, String> {
    // Métodos personalizados si es necesario
}
