package com.example.Filmoteca.Content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Filmoteca.Content.IService.IMovie;
import com.example.Filmoteca.Content.entity.Movie;
import com.example.Filmoteca.Content.repository.IBaseRepositoryContent;
import com.example.Filmoteca.Content.repository.IMovieRepository;

@Service
public class MovieService extends ABaseContentService<Movie> implements IMovie {
    @Override
    protected IBaseRepositoryContent<Movie, String> getRepository() {
        return repository;
    }

    @Autowired
    private IMovieRepository repository;
}
