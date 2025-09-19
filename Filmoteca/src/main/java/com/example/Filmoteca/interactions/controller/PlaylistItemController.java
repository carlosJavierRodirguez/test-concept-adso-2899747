package com.example.Filmoteca.interactions.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.interactions.dto.request.PlaylistItemRequestDto;
import com.example.Filmoteca.interactions.dto.response.PlaylistItemResponseDto;
import com.example.Filmoteca.interactions.IService.IPlaylistItemService;
import com.example.Filmoteca.interactions.entity.PlaylistItem;
import com.example.Filmoteca.users.entity.User;
import com.example.Filmoteca.Content.entity.Movie;
import com.example.Filmoteca.interactions.entity.Playlist;
import com.example.Filmoteca.Content.entity.Series;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/playlist-item")
public class PlaylistItemController extends
        ABaseControllerInteractions<PlaylistItem, IPlaylistItemService, PlaylistItemRequestDto, PlaylistItemResponseDto> {
    public PlaylistItemController(IPlaylistItemService service) {
        super(service, "PlaylistItem");
    }

    @Override
    protected PlaylistItem convertToModel(PlaylistItemRequestDto dto) {
        PlaylistItem entity = new PlaylistItem();
        entity.setStatus(dto.getStatus());
        if (dto.getMovieId() != null) {
            Movie ref = new Movie();
            ref.setId(dto.getMovieId());
            entity.setMovie(ref);
        }
        if (dto.getPlaylistId() != null) {
            Playlist ref = new Playlist();
            ref.setId(dto.getPlaylistId());
            entity.setPlaylist(ref);
        }
        if (dto.getSeriesId() != null) {
            Series ref = new Series();
            ref.setId(dto.getSeriesId());
            entity.setSeries(ref);
        }
        return entity;
    }

    @Override
    protected PlaylistItemResponseDto convertToDto(PlaylistItem entity) {
        PlaylistItemResponseDto dto = new PlaylistItemResponseDto();
        dto.setId(entity.getId());
        dto.setStatus(entity.getStatus());
        if (entity.getMovie() != null) {
            dto.setMovieId(entity.getMovie().getId());
        }
        if (entity.getSeries() != null) {
            dto.setSeriesId(entity.getSeries().getId());
        }
        if (entity.getPlaylist() != null) {
            dto.setPlaylistId(entity.getPlaylist().getId());
        }
        return dto;
    }
}
