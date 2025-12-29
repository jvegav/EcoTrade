package com.example.ecotrade.dto;

import com.example.ecotrade.model.User;
import java.time.LocalDateTime;

public class UserResponseDTO {
    
    private Long id;
    private LocalDateTime createdAt;
    private String name;
    private String email;
    private String nationality;

    // Constructor vacío
    public UserResponseDTO() {
    }

    // Constructor desde User
    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.createdAt = user.getCreatedAt();
        this.name = user.getName();
        this.email = user.getEmail();
        this.nationality = user.getNationality();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}
