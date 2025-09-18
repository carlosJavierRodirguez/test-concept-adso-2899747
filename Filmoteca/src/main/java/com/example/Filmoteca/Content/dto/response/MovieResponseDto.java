package com.example.Filmoteca.Content.dto.response;

import lombok.Data;

@Data
public class MovieResponseDto  extends BaseResponseContentDto{
    private String title;
    private Integer releaseYear;
    private Integer duration;
    private String synopsis;
    private String directorId;
    private String genreId;
}
