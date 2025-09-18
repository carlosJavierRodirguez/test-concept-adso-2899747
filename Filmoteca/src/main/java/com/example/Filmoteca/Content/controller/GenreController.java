package com.example.Filmoteca.Content.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.Content.dto.request.GenreRequestDto;
import com.example.Filmoteca.Content.dto.response.GenreResponseDto;
import com.example.Filmoteca.Content.IService.IGenre;
import com.example.Filmoteca.Content.entity.Genre;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/genre")
public class GenreController extends ABaseControllerContent<Genre, IGenre, GenreRequestDto, GenreResponseDto> {

    public GenreController(IGenre service) {
        super(service, "Genre");
    }

    @Override
    protected Genre convertToModel(GenreRequestDto dto) {
        Genre entity = new Genre();
            entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    @Override
    protected GenreResponseDto convertToDto(Genre entity) {
        GenreResponseDto dto = new GenreResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
