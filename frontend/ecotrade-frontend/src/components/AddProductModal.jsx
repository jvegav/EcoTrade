import React, { useState } from 'react';
import { productAPI } from '../services/api';
import './AddProductModal.css';

const AddProductModal = ({ onClose, onProductAdded, userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    useTime: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };
      
      await productAPI.createProduct(userId, productData);
      onProductAdded();
      onClose();
    } catch (err) {
      setError('Erreur lors de la création du produit. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Ajouter un Produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du Produit</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: Lampe de bureau"
            />
          </div>
          <div className="form-group">
            <label>Prix (€)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="15.00"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Décrivez l'état et les caractéristiques du produit..."
            />
          </div>
          <div className="form-group">
            <label>Durée d'Utilisation</label>
            <input
              type="text"
              name="useTime"
              value={formData.useTime}
              onChange={handleChange}
              required
              placeholder="Ex: 6 mois, 1 an"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Publication...' : 'Publier le Produit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
