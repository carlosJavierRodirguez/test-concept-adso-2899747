package com.example.Filmoteca.interactions.dto.request;

import com.example.Filmoteca.interactions.dto.BaseDTO;
import lombok.Data;

@Data
public class PlaylistItemRequestDto extends BaseDTO {
    private String playlistId;
    private String movieId;
    private String seriesId;
}
