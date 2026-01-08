package com.example.ecotrade.dto;

import com.example.ecotrade.model.Product;
import java.time.LocalDateTime;

public class ProductResponseDTO {
    
    private Long id;
    private LocalDateTime createdAt;
    private String name;
    private Double price;
    private String description;
    private String useTime;
    private String userName;
    private String userId;

    // Constructor vacío
    public ProductResponseDTO() {
    }

    // Constructor desde Product
    public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.createdAt = product.getCreatedAt();
        this.name = product.getName();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.useTime = product.getUseTime();
        if (product.getUser() != null) {
            this.userName = product.getUser().getName();
            this.userId = product.getUser().getId();
        }
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
