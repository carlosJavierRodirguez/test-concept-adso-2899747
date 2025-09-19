package com.example.Filmoteca.users.dto.response;

import com.example.Filmoteca.users.dto.BaseDTOUsers;
import lombok.Data;

@Data
public class RoleResponseDto extends BaseDTOUsers {
    private String id;
    private String name;
    private String description;
}
