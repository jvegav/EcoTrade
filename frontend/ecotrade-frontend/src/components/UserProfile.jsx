import { useState, useEffect } from 'react';
import { productAPI, userAPI } from '../services/api';
import ProductCard from './ProductCard';
import './UserProfile.css';

const UserProfile = ({ user, onBack, onLogout }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProducts();
  }, [user]);

  const fetchUserProducts = async () => {
    setLoading(true);
    try {
      // Solo necesitamos el ID del backend para obtener los productos
      const userResponse = await userAPI.getUserByEmail(user.email);
      const backendUserId = userResponse.data.id;

      const productsResponse = await productAPI.getProductsByUserId(backendUserId);
      setUserProducts(productsResponse.data);
    } catch (error) {
      console.error('Error fetching user products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <button className="back-button" onClick={onBack}>
        ← Retour
      </button>

      <div className="profile-header">
        <div className="profile-avatar">
          {user?.user_metadata?.name?.charAt(0).toUpperCase() || '👤'}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">
            {user?.user_metadata?.name || 'Utilisateur'}
          </h2>
          <p className="profile-email">{user?.email}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{userProducts.length}</span>
              <span className="stat-label">Produits Publiés</span>
            </div>
          </div>
          <button onClick={onLogout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Mes Produits</h3>
        {loading ? (
          <div className="loading">Chargement de vos produits...</div>
        ) : userProducts.length === 0 ? (
          <div className="no-products">
            <p>Vous n'avez pas encore publié de produits.</p>
            <p>Commencez à vendre vos articles d'occasion !</p>
          </div>
        ) : (
          <div className="products-grid">
            {userProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
