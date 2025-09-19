package com.example.Filmoteca.users.dto.request;

import com.example.Filmoteca.users.dto.BaseDTOUsers;

import lombok.Data;

@Data
public class ProfileRequestDto extends BaseDTOUsers{
    private String avatarUrl;
    private String preferences;
    private String country;
}
