package com.example.Filmoteca.Content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Filmoteca.Content.IService.IDirector;
import com.example.Filmoteca.Content.entity.Director;
import com.example.Filmoteca.Content.repository.IBaseRepositoryContent;
import com.example.Filmoteca.Content.repository.IDirectorRepository;

@Service
public class DirectorService extends ABaseContentService<Director> implements IDirector {
    @Override
    protected IBaseRepositoryContent<Director, String> getRepository() {
        return repository;
    }

    @Autowired
    private IDirectorRepository repository;
}
