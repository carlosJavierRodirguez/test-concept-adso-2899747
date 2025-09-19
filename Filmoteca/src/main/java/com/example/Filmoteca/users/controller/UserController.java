package com.example.Filmoteca.users.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.users.dto.request.UserRequestDto;
import com.example.Filmoteca.users.dto.response.UserResponseDto;
import com.example.Filmoteca.users.IService.IUserService;
import com.example.Filmoteca.users.entity.User;
import com.example.Filmoteca.users.entity.Role;
import com.example.Filmoteca.users.entity.Profile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/user")
public class UserController extends ABaseControllerUsers<User, IUserService, UserRequestDto, UserResponseDto> {
    public UserController(IUserService service) {
        super(service, "User");
    }

    @Override
    protected User convertToModel(UserRequestDto dto) {
        User entity = new User();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPasswordHash(dto.getPasswordHash());
        entity.setStatus(dto.getStatus());

        if (dto.getRoleId() != null) {
            Role role = new Role();
            role.setId(dto.getRoleId());
            entity.setRole(role);
        }
        if (dto.getProfileId() != null) {
            Profile profile = new Profile();
            profile.setId(dto.getProfileId());
            entity.setProfile(profile);
        }
        return entity;
    }

    @Override
    protected UserResponseDto convertToDto(User entity) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setStatus(entity.getStatus());
        dto.setPasswordHash(entity.getPasswordHash());
        if (entity.getRole() != null) {
            dto.setRoleId(entity.getRole().getId());
        }
        if (entity.getProfile() != null) {
            dto.setProfileId(entity.getProfile().getId());
        }
        return dto;
    }
}
