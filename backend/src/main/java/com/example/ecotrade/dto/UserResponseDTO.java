package com.example.ecotrade.dto;

import com.example.ecotrade.model.User;
import java.time.LocalDateTime;
import java.util.UUID;

public class UserResponseDTO {
    
    private UUID id;
    private String email;
    private String displayName;
    private String avatarUrl;
    private LocalDateTime createdAt;
    private String supabaseId;

    // Constructor vacío
    public UserResponseDTO() {
    }

    // Constructor desde User
    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.displayName = user.getDisplayName();
        this.avatarUrl = user.getAvatarUrl();
        this.createdAt = user.getCreatedAt();
        this.supabaseId = user.getSupabaseId();
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getSupabaseId() {
        return supabaseId;
    }

    public void setSupabaseId(String supabaseId) {
        this.supabaseId = supabaseId;
    }
}
