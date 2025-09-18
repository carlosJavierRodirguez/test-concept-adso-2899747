package com.example.Filmoteca.Content.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.Content.dto.request.DirectorRequestDto;
import com.example.Filmoteca.Content.dto.response.DirectorResponseDto;
import com.example.Filmoteca.Content.IService.IDirector;

import com.example.Filmoteca.Content.entity.Director;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/director")
public class DirectorController
        extends ABaseControllerContent<Director, IDirector, DirectorRequestDto, DirectorResponseDto> {

    public DirectorController(IDirector service) {
        super(service, "Director");
    }

    @Override
    protected Director convertToModel(DirectorRequestDto dto) {
        Director entity = new Director();
        entity.setName(dto.getName());
        entity.setNationality(dto.getNationality());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    @Override
    protected DirectorResponseDto convertToDto(Director entity) {
        DirectorResponseDto dto = new DirectorResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setStatus(entity.getStatus());
        dto.setNationality(entity.getNationality());
        return dto;
    }

}
