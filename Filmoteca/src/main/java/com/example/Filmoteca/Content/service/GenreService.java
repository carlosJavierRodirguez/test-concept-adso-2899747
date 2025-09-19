package com.example.Filmoteca.Content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Filmoteca.Content.IService.IGenre;
import com.example.Filmoteca.Content.entity.Genre;
import com.example.Filmoteca.Content.repository.IBaseRepositoryContent;
import com.example.Filmoteca.Content.repository.IGenreRepository;

@Service
public class GenreService extends ABaseContentService<Genre> implements IGenre {
    @Override
    protected IBaseRepositoryContent<Genre, String> getRepository() {
        return repository;
    }

    @Autowired
    private IGenreRepository repository;
}
