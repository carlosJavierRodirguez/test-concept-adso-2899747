package com.example.Filmoteca.interactions.service;

import com.example.Filmoteca.interactions.IService.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Filmoteca.interactions.entity.Review;
import com.example.Filmoteca.interactions.repository.IReviewRepository;
import com.example.Filmoteca.interactions.repository.IBaseRepositoryInteractions;

@Service
public class ReviewService extends ABaseInteractionsService<Review> implements IReviewService {
    @Autowired
    private IReviewRepository repository;

    @Override
    protected IBaseRepositoryInteractions<Review, String> getRepository() {
        return repository;
    }
}
