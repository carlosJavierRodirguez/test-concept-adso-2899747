package com.example.Filmoteca.interactions.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.interactions.dto.request.PlaylistRequestDto;
import com.example.Filmoteca.interactions.dto.response.PlaylistResponseDto;
import com.example.Filmoteca.Content.entity.Director;
import com.example.Filmoteca.interactions.IService.IPlaylistService;
import com.example.Filmoteca.interactions.entity.Playlist;
import com.example.Filmoteca.users.entity.User;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/playlist")
public class PlaylistController
        extends ABaseControllerInteractions<Playlist, IPlaylistService, PlaylistRequestDto, PlaylistResponseDto> {
    public PlaylistController(IPlaylistService service) {
        super(service, "Playlist");
    }

    @Override
    protected Playlist convertToModel(PlaylistRequestDto dto) {
        Playlist entity = new Playlist();
        entity.setName(dto.getName());
        entity.setStatus(dto.getStatus());
        if (dto.getUserId() != null) {
            User ref = new User();
            ref.setId(dto.getUserId());
            entity.setUser(ref);
        }
        return entity;
    }

    @Override
    protected PlaylistResponseDto convertToDto(Playlist entity) {
        PlaylistResponseDto dto = new PlaylistResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setStatus(entity.getStatus());
        if (entity.getUser() != null) {
            dto.setUserId(entity.getUser().getId());
        }
        return dto;
    }
}
