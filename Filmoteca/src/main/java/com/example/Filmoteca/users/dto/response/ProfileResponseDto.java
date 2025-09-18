package com.example.Filmoteca.users.dto.response;

import com.example.Filmoteca.users.dto.BaseDTOUsers;
import lombok.Data;

@Data
public class ProfileResponseDto extends BaseDTOUsers {
    private String id;
    private String avatarUrl;
    private String preferences;
    private String country;
}
