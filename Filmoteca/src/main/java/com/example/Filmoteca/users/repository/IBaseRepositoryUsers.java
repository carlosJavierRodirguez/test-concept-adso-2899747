package com.example.Filmoteca.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IBaseRepositoryUsers<T, ID> extends JpaRepository<T, ID> {
    // Métodos personalizados si es necesario
}
