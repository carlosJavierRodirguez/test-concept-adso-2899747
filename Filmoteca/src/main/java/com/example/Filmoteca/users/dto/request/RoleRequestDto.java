package com.example.Filmoteca.users.dto.request;

import com.example.Filmoteca.users.dto.BaseDTOUsers;

import lombok.Data;

@Data
public class RoleRequestDto extends BaseDTOUsers {
    private String name;
    private String description;
}
