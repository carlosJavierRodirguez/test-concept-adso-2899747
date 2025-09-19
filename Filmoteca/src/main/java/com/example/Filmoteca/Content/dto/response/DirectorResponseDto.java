package com.example.Filmoteca.Content.dto.response;

import lombok.Data;
import com.example.Filmoteca.Content.dto.response.BaseResponseContentDto;

@Data
public class DirectorResponseDto extends BaseResponseContentDto {
    private String nationality;
}
