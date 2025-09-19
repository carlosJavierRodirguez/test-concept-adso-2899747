package com.example.Filmoteca.interactions.repository;

import com.example.Filmoteca.interactions.entity.Review;
import org.springframework.stereotype.Repository;

@Repository
public interface IReviewRepository extends IBaseRepositoryInteractions<Review, String> {
    // Métodos personalizados si es necesario
}
