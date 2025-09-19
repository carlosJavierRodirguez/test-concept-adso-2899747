package com.example.Filmoteca.Content.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Filmoteca.Content.entity.AuditableEntityContent;

public interface IBaseRepositoryContent <T extends AuditableEntityContent, ID> extends JpaRepository<T, ID> {

}
