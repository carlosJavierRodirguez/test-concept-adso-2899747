package com.example.Filmoteca.Content.repository;

import com.example.Filmoteca.Content.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGenreRepository extends IBaseRepositoryContent<Genre, String> {

}
