package com.example.Filmoteca.Content.dto.request;

import com.example.Filmoteca.Content.dto.BaseDTO;

import lombok.Data;

@Data
public class SeriesRequestDto extends BaseDTO{
    private Integer seasons;
    private String synopsis;
    private String directorId;
    private String genreId;
}
