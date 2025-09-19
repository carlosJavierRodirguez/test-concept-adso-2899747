package com.example.Filmoteca.Content.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.Filmoteca.Content.IService.IBaseServiceContent;
import com.example.Filmoteca.Content.dto.ApiResponseDto;
import com.example.Filmoteca.Content.entity.AuditableEntityContent;

public abstract class ABaseControllerContent<T extends AuditableEntityContent, S extends IBaseServiceContent<T>, ReqDto, ResDto> {

    protected S service;
    protected String entityName;

    protected ABaseControllerContent(S service, String entityName) {
        this.service = service;
        this.entityName = entityName;
    }

    protected abstract T convertToModel(ReqDto dto);

    protected abstract ResDto convertToDto(T entity);

    // ----------- GET ALL ------------
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<ResDto>>> findByStateTrue() {
        try {
            List<ResDto> data = service.findByStateTrue()
                    .stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new ApiResponseDto<>("Datos obtenidos", data, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    // ----------- GET BY ID ------------
    @GetMapping("{id}")
    public ResponseEntity<ApiResponseDto<Optional<ResDto>>> show(@PathVariable String id) {
        try {
            Optional<ResDto> dto = service.findById(id).map(this::convertToDto);
            return ResponseEntity.ok(new ApiResponseDto<>("Registro encontrado", dto, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    // ----------- POST (solo ReqDto) ------------
    @PostMapping
    public ResponseEntity<ApiResponseDto<ResDto>> save(@RequestBody ReqDto dto) {
        try {
            T saved = service.save(convertToModel(dto));
            return ResponseEntity.ok(new ApiResponseDto<>("Datos guardados", convertToDto(saved), true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    // ----------- PUT (solo ReqDto) ------------
    @PutMapping("{id}")
    public ResponseEntity<ApiResponseDto<Void>> update(@PathVariable String id, @RequestBody ReqDto dto) {
        try {
            service.update(id, convertToModel(dto));
            return ResponseEntity.ok(new ApiResponseDto<>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    // ----------- DELETE ------------
    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponseDto<Void>> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return ResponseEntity.ok(new ApiResponseDto<>("Registro eliminado", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}
