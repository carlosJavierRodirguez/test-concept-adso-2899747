package com.example.Filmoteca.users.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.users.dto.request.RoleRequestDto;
import com.example.Filmoteca.users.dto.response.RoleResponseDto;
import com.example.Filmoteca.users.IService.IRoleService;
import com.example.Filmoteca.users.entity.Role;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/role")
public class RoleController extends ABaseControllerUsers<Role, IRoleService, RoleRequestDto, RoleResponseDto> {
    public RoleController(IRoleService service) {
        super(service, "Role");
    }

    @Override
    protected Role convertToModel(RoleRequestDto dto) {
        Role entity = new Role();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());

        return entity;
    }

    @Override
    protected RoleResponseDto convertToDto(Role entity) {
        RoleResponseDto dto = new RoleResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());

        return dto;
    }
}
