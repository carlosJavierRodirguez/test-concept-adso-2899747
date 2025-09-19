package com.example.Filmoteca.users.repository;

import com.example.Filmoteca.users.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends IBaseRepositoryUsers<User, String> {
    // Métodos personalizados si es necesario
}
