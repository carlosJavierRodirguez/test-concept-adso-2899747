package com.example.Filmoteca.Content.dto.request;

import com.example.Filmoteca.Content.dto.BaseDTO;

import lombok.Data;

@Data
public class MovieRequestDto extends BaseDTO{
    private Integer releaseYear;
    private Integer duration;
    private String synopsis;
    private String directorId;
    private String genreId;
}
