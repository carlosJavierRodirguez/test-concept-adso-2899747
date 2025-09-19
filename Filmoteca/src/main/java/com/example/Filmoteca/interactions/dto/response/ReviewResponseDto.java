package com.example.Filmoteca.interactions.dto.response;

import lombok.Data;

@Data
public class ReviewResponseDto extends BaseResponseInteractionsDto {
    private String content;
    private Integer rating;
    private String date;
    private String userId;
    private String movieId;
    private String seriesId;
}
