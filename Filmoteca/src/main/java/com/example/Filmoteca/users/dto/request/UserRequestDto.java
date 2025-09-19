package com.example.Filmoteca.users.dto.request;

import com.example.Filmoteca.users.dto.BaseDTOUsers;

import lombok.Data;

@Data
public class UserRequestDto extends BaseDTOUsers{
    private String name;
    private String email;
    private String passwordHash;
    private String roleId;
    private String profileId;
}
