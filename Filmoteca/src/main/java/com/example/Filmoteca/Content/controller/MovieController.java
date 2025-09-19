package com.example.Filmoteca.Content.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.Content.dto.request.MovieRequestDto;
import com.example.Filmoteca.Content.dto.response.MovieResponseDto;
import com.example.Filmoteca.Content.IService.IMovie;
import com.example.Filmoteca.Content.entity.Movie;
import com.example.Filmoteca.Content.entity.Director;
import com.example.Filmoteca.Content.entity.Genre;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/movie")
public class MovieController extends ABaseControllerContent<Movie, IMovie, MovieRequestDto, MovieResponseDto> {

    public MovieController(IMovie service) {
        super(service, "Movie");
    }

    @Override
    protected Movie convertToModel(MovieRequestDto dto) {
        Movie entity = new Movie();
        entity.setName(dto.getName());
        entity.setReleaseYear(dto.getReleaseYear());
        entity.setDuration(dto.getDuration());
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
    protected MovieResponseDto convertToDto(Movie entity) {
        MovieResponseDto dto = new MovieResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setReleaseYear(entity.getReleaseYear());
        dto.setDuration(entity.getDuration());
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
