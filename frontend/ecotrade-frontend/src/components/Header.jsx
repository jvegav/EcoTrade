import React from 'react';
import './Header.css';

const Header = ({ user, onLoginClick, onRegisterClick, onAddProductClick, onLogoClick, onProfileClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={onLogoClick}>
          <h1>EcoTrade</h1>
        </div>
        <nav className="nav-buttons">
          {user ? (
            <>
              <span className="user-welcome">Bonjour, {user?.user_metadata?.name || 'Utilisateur'} !</span>
              <button onClick={onProfileClick} className="btn-secondary">
                👤 Mon Profil
              </button>
              <button onClick={onAddProductClick} className="btn-primary">
                + Ajouter un Produit
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
