package com.example.Filmoteca.users.service;

import com.example.Filmoteca.users.entity.User;
import com.example.Filmoteca.users.repository.IUserRepository;
import com.example.Filmoteca.users.repository.IBaseRepositoryUsers;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ABaseUsersService<User> implements com.example.Filmoteca.users.IService.IUserService {
    private final IUserRepository repository;

    public UserService(IUserRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IBaseRepositoryUsers<User, String> getRepository() {
        return repository;
    }
}
