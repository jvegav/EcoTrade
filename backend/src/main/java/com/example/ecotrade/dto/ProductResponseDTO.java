package com.example.ecotrade.dto;

import com.example.ecotrade.model.Product;
import java.time.LocalDateTime;
import java.util.UUID;

public class ProductResponseDTO {
    
    private Long id;
    private String name;
    private Double price;
    private UUID ownerId;
    private LocalDateTime createdAt;
    private String description;
    private String useTime;
    private String userName;

    // Constructor vacío
    public ProductResponseDTO() {
    }

    // Constructor desde Product
    public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.ownerId = product.getOwnerId();
        this.createdAt = product.getCreatedAt();
        this.description = product.getDescription();
        this.useTime = product.getUseTime();
        if (product.getUser() != null) {
            this.userName = product.getUser().getDisplayName();
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public UUID getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(UUID ownerId) {
        this.ownerId = ownerId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUseTime() {
        return useTime;
    }

    public void setUseTime(String useTime) {
        this.useTime = useTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
