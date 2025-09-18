package com.example.Filmoteca.interactions.service;

import com.example.Filmoteca.interactions.IService.IPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Filmoteca.interactions.entity.Playlist;
import com.example.Filmoteca.interactions.repository.IPlaylistRepository;
import com.example.Filmoteca.interactions.repository.IBaseRepositoryInteractions;

@Service
public class PlaylistService extends ABaseInteractionsService<Playlist> implements IPlaylistService {
    @Autowired
    private IPlaylistRepository repository;

    @Override
    protected IBaseRepositoryInteractions<Playlist, String> getRepository() {
        return repository;
    }
}
