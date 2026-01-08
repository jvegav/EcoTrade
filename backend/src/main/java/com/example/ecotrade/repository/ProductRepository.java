package com.example.ecotrade.repository;

import com.example.ecotrade.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerId(UUID ownerId);
}
