package com.example.Filmoteca.Content.dto.response;

import lombok.Data;

@Data
public class SeriesResponseDto  extends BaseResponseContentDto{
    private String title;
    private Integer seasons;
    private String synopsis;
    private String directorId;
    private String genreId;
}
