import React, { useEffect } from 'react';
import './SuccessNotification.css';

const SuccessNotification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notification-overlay">
      <div className="notification-content">
        <div className="notification-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#4a8f5f" strokeWidth="2"/>
            <path d="M8 12L11 15L16 9" stroke="#4a8f5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="notification-text">
          <h3>Inscription réussie !</h3>
          <p>{message}</p>
        </div>
        <button className="notification-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default SuccessNotification;
