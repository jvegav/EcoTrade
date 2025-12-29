import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, loading }) => {
  if (loading) {
    return <div className="loading">Chargement des produits...</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <h2>📦 Aucun produit disponible</h2>
        <p>Soyez le premier à publier un produit!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
