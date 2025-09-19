package com.example.Filmoteca.users.service;

import com.example.Filmoteca.users.entity.Role;
import com.example.Filmoteca.users.repository.IRoleRepository;
import com.example.Filmoteca.users.repository.IBaseRepositoryUsers;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends ABaseUsersService<Role> implements com.example.Filmoteca.users.IService.IRoleService {
    private final IRoleRepository repository;

    public RoleService(IRoleRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IBaseRepositoryUsers<Role, String> getRepository() {
        return repository;
    }
}
