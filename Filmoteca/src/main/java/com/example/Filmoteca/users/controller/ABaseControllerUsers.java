package com.example.Filmoteca.users.controller;

import com.example.Filmoteca.users.IService.IBaseServiceUsers;
import com.example.Filmoteca.users.dto.BaseDTOUsers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
public abstract class ABaseControllerUsers<T, S extends IBaseServiceUsers<T>, Req, Res extends BaseDTOUsers> {
    protected final S service;
    private final String entityName;

    public ABaseControllerUsers(S service, String entityName) {
        this.service = service;
        this.entityName = entityName;
    }

    @GetMapping
    public ResponseEntity<List<Res>> findAll() {
        try {
            List<Res> data = service.findByStateTrue()
                    .stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Optional<Res>> show(@PathVariable String id) {
        try {
            Optional<Res> dto = service.findById(id).map(this::convertToDto);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Res> create(@RequestBody Req dto) {
        try {
            T entity = convertToModel(dto);
            T saved = service.save(entity);
            return ResponseEntity.ok(convertToDto(saved));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable String id, @RequestBody Req dto) {
        try {
            T entity = convertToModel(dto);
            service.update(id, entity);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    protected abstract T convertToModel(Req dto);

    protected abstract Res convertToDto(T entity);
}
