package com.example.Filmoteca.users.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.users.dto.request.ProfileRequestDto;
import com.example.Filmoteca.users.dto.response.ProfileResponseDto;
import com.example.Filmoteca.users.IService.IProfileService;
import com.example.Filmoteca.users.entity.Profile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/profile")
public class ProfileController extends ABaseControllerUsers<Profile, IProfileService, ProfileRequestDto, ProfileResponseDto> {

    public ProfileController(IProfileService service) {
        super(service, "Profile");
    }

    @Override
    protected Profile convertToModel(ProfileRequestDto dto) {
        Profile entity = new Profile();
        entity.setAvatarUrl(dto.getAvatarUrl());
        entity.setPreferences(dto.getPreferences());
        entity.setCountry(dto.getCountry());
        entity.setStatus(dto.getStatus());

        return entity;
    }

    @Override
    protected ProfileResponseDto convertToDto(Profile entity) {
        ProfileResponseDto dto = new ProfileResponseDto();
        dto.setId(entity.getId());
        dto.setAvatarUrl(entity.getAvatarUrl());
        dto.setPreferences(entity.getPreferences());
        dto.setCountry(entity.getCountry());
        dto.setStatus(entity.getStatus());

        return dto;
    }
}
