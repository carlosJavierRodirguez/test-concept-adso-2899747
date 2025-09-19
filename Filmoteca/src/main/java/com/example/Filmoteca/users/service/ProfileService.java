package com.example.Filmoteca.users.service;

import com.example.Filmoteca.users.entity.Profile;
import com.example.Filmoteca.users.repository.IProfileRepository;
import com.example.Filmoteca.users.repository.IBaseRepositoryUsers;
import org.springframework.stereotype.Service;

@Service
public class ProfileService extends ABaseUsersService<Profile>
        implements com.example.Filmoteca.users.IService.IProfileService {
    private final IProfileRepository repository;

    public ProfileService(IProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IBaseRepositoryUsers<Profile, String> getRepository() {
        return repository;
    }
}
