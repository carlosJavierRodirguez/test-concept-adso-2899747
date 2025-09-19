package com.example.Filmoteca.interactions.dto.request;

import com.example.Filmoteca.interactions.dto.BaseDTO;
import lombok.Data;

@Data
public class ReviewRequestDto extends BaseDTO {
    private String content;
    private Integer rating;
    private String date;
    private String userId;
    private String movieId;
    private String seriesId;
}
