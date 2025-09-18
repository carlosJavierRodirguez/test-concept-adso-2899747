package com.example.Filmoteca.interactions.dto.response;

import lombok.Data;

@Data
public class PlaylistResponseDto extends BaseResponseInteractionsDto {
    private String name;
    private String userId;
}
