package com.example.Filmoteca.users.repository;

import com.example.Filmoteca.users.entity.Profile;
import org.springframework.stereotype.Repository;

@Repository
public interface IProfileRepository extends IBaseRepositoryUsers<Profile, String> {
    // Métodos personalizados si es necesario
}
