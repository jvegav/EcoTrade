import React, { useState } from 'react';
import { userAPI } from '../services/api';
import './RegisterModal.css';

const RegisterModal = ({ onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nationality: '',
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
      const response = await userAPI.createUser(formData);
      const newUser = response.data;
      localStorage.setItem('user', JSON.stringify(newUser));
      onRegisterSuccess(newUser);
      onClose();
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError('Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Créer un Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Minimum 6 caractères"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Nationalité</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              placeholder="Votre pays d'origine"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Création du compte...' : 'S\'inscrire'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
