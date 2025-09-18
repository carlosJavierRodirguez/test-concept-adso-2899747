package com.example.Filmoteca.interactions.dto.response;

import lombok.Data;

@Data
public class PlaylistItemResponseDto extends BaseResponseInteractionsDto {
    private String playlistId;
    private String movieId;
    private String seriesId;
}
