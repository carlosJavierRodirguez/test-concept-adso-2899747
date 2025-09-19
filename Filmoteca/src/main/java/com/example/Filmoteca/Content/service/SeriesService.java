package com.example.Filmoteca.Content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Filmoteca.Content.IService.ISeries;
import com.example.Filmoteca.Content.entity.Series;
import com.example.Filmoteca.Content.repository.IBaseRepositoryContent;
import com.example.Filmoteca.Content.repository.ISeriesRepository;

@Service
public class SeriesService extends ABaseContentService<Series> implements ISeries {
    @Override
    protected IBaseRepositoryContent<Series, String> getRepository() {
        return repository;
    }

    @Autowired
    private ISeriesRepository repository;
}
