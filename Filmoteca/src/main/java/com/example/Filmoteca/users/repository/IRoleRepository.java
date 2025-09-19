package com.example.Filmoteca.users.repository;

import com.example.Filmoteca.users.entity.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends IBaseRepositoryUsers<Role, String> {
    // Métodos personalizados si es necesario
}
