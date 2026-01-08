package com.example.ecotrade.controller;

import com.example.ecotrade.dto.ProductResponseDTO;
import com.example.ecotrade.model.Product;
import com.example.ecotrade.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductResponseDTO> productDTOs = products.stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ProductResponseDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByUserId(@PathVariable UUID userId) {
        List<Product> products = productService.getProductsByUserId(userId);
        List<ProductResponseDTO> productDTOs = products.stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDTOs);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createProduct(@RequestBody Product product, @PathVariable UUID userId) {
        try {
            Product createdProduct = productService.createProduct(product, userId);
            ProductResponseDTO productDTO = new ProductResponseDTO(createdProduct);
            return ResponseEntity.status(HttpStatus.CREATED).body(productDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            ProductResponseDTO productDTO = new ProductResponseDTO(updatedProduct);
            return ResponseEntity.ok(productDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().body("Product deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
