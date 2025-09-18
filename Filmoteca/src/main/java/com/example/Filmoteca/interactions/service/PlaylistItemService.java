package com.example.Filmoteca.interactions.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Filmoteca.interactions.IService.IPlaylistItemService;
import com.example.Filmoteca.interactions.entity.PlaylistItem;
import com.example.Filmoteca.interactions.repository.IPlaylistItemRepository;
import com.example.Filmoteca.interactions.repository.IBaseRepositoryInteractions;

@Service
public class PlaylistItemService extends ABaseInteractionsService<PlaylistItem> implements IPlaylistItemService {
    @Autowired
    private IPlaylistItemRepository repository;

    @Override
    protected IBaseRepositoryInteractions<PlaylistItem, String> getRepository() {
        return repository;
    }
}
