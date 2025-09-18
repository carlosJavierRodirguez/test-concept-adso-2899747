package com.example.Filmoteca.interactions.dto.request;

import com.example.Filmoteca.interactions.dto.BaseDTO;
import lombok.Data;

@Data
public class PlaylistRequestDto extends BaseDTO {
    private String userId;
    private String name;
}
