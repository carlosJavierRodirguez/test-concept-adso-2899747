package com.example.Filmoteca.interactions.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IBaseRepositoryInteractions<T, ID> extends JpaRepository<T, ID> {
    // Métodos personalizados si es necesario
}
