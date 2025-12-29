import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import AddProductModal from './components/AddProductModal';
import { productAPI } from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch products on mount and when user changes
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleProductAdded = () => {
    fetchProducts();
  };

  const handleLogoClick = () => {
    fetchProducts();
  };

  return (
    <div className="app">
      <Header
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onAddProductClick={() => setShowAddProductModal(true)}
        onLogout={handleLogout}
        onLogoClick={handleLogoClick}
      />

      <main className="main-content">
        <div className="hero">
          <h2>Économie Circulaire pour Étudiants d'Échange</h2>
          <p>
            Achetez et vendez des articles d'occasion avec d'autres étudiants.
            Économisez de l'argent et aidez l'environnement.
          </p>
        </div>

        <ProductList products={products} loading={loading} />
      </main>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {showAddProductModal && user && (
        <AddProductModal
          onClose={() => setShowAddProductModal(false)}
          onProductAdded={handleProductAdded}
          userId={user.id}
        />
      )}
    </div>
  );
}

export default App;
