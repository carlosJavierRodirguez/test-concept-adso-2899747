package com.example.Filmoteca.Content.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.Content.dto.request.SeriesRequestDto;
import com.example.Filmoteca.Content.dto.response.SeriesResponseDto;
import com.example.Filmoteca.Content.IService.ISeries;
import com.example.Filmoteca.Content.entity.Series;
import com.example.Filmoteca.Content.entity.Director;
import com.example.Filmoteca.Content.entity.Genre;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/series")
public class SeriesController extends ABaseControllerContent<Series, ISeries, SeriesRequestDto, SeriesResponseDto> {

    public SeriesController(ISeries service) {
        super(service, "Series");
    }

    @Override
    protected Series convertToModel(SeriesRequestDto dto) {
        Series entity = new Series();
        entity.setName(dto.getName());
        entity.setSeasons(dto.getSeasons());
        entity.setSynopsis(dto.getSynopsis());
        entity.setStatus(dto.getStatus());
        if (dto.getDirectorId() != null) {
            Director ref = new Director();
            ref.setId(dto.getDirectorId());
            entity.setDirector(ref);
        }
        if (dto.getGenreId() != null) {
            Genre ref = new Genre();
            ref.setId(dto.getGenreId());
            entity.setGenre(ref);
        }
        return entity;
    }

    @Override
    protected SeriesResponseDto convertToDto(Series entity) {
        SeriesResponseDto dto = new SeriesResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSeasons(entity.getSeasons());
        dto.setSynopsis(entity.getSynopsis());
        dto.setStatus(entity.getStatus());
        if (entity.getDirector() != null) {
            dto.setDirectorId(entity.getDirector().getId());
        }
        if (entity.getGenre() != null) {
            dto.setGenreId(entity.getGenre().getId());
        }
        return dto;
    }
}
