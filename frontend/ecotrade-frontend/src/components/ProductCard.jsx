import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        📦
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">€{product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-use-time">⏱️ {product.useTime}</span>
          <span className="product-owner">👤 {product.userName}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
