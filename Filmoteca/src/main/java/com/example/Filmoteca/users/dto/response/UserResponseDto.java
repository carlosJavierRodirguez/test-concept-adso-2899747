package com.example.Filmoteca.users.dto.response;

import com.example.Filmoteca.users.dto.BaseDTOUsers;
import lombok.Data;

@Data
public class UserResponseDto extends BaseDTOUsers {
    private String id;
    private String name;
    private String email;
    private String passwordHash;
    private String roleId;
    private String profileId;
}
