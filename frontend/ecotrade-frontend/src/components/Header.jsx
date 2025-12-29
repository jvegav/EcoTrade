import React from 'react';
import './Header.css';

const Header = ({ user, onLoginClick, onRegisterClick, onAddProductClick, onLogout, onLogoClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={onLogoClick}>
          <h1>🌱 EcoTrade</h1>
        </div>
        <nav className="nav-buttons">
          {user ? (
            <>
              <span className="user-welcome">Bonjour, {user.name}!</span>
              <button onClick={onAddProductClick} className="btn-primary">
                + Ajouter un Produit
              </button>
              <button onClick={onLogout} className="btn-secondary">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="btn-secondary">
                Se Connecter
              </button>
              <button onClick={onRegisterClick} className="btn-primary">
                S'inscrire
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
