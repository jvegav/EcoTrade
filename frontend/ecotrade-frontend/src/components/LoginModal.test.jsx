import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal';
import { userAPI } from '../services/api';

vi.mock('../services/api', () => ({
  userAPI: {
    getUserByEmail: vi.fn(),
  },
}));

describe('LoginModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnLoginSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    expect(screen.getByRole('heading', { name: /Se Connecter/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se Connecter/i })).toBeInTheDocument();
  });

  it('allows user to type in email and password fields', async () => {
    const user = userEvent.setup();
    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal when clicking on overlay', async () => {
    const user = userEvent.setup();
    const { container } = render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const overlay = container.querySelector('.modal-overlay');
    await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not close modal when clicking on modal content', async () => {
    const user = userEvent.setup();
    const { container } = render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const modalContent = container.querySelector('.modal-content');
    await user.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('successfully logs in with correct credentials', async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    userAPI.getUserByEmail.mockResolvedValue({ data: mockUser });

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    await user.click(screen.getByRole('button', { name: /Se Connecter/i }));

    await waitFor(() => {
      expect(userAPI.getUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockOnLoginSuccess).toHaveBeenCalledWith(mockUser);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows error message with incorrect password', async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    userAPI.getUserByEmail.mockResolvedValue({ data: mockUser });

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /Se Connecter/i }));

    await waitFor(() => {
      expect(screen.getByText('Mot de passe incorrect')).toBeInTheDocument();
      expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
  });

  it('shows error message when user is not found', async () => {
    const user = userEvent.setup();
    userAPI.getUserByEmail.mockRejectedValue(new Error('User not found'));

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'nonexistent@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    await user.click(screen.getByRole('button', { name: /Se Connecter/i }));

    await waitFor(() => {
      expect(screen.getByText('Utilisateur non trouvé ou identifiants incorrects')).toBeInTheDocument();
      expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
  });

  it('disables submit button while loading', async () => {
    const user = userEvent.setup();
    userAPI.getUserByEmail.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    
    const submitButton = screen.getByRole('button', { name: /Se Connecter/i });
    await user.click(submitButton);

    expect(screen.getByText('Connexion...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('stores user in localStorage on successful login', async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    userAPI.getUserByEmail.mockResolvedValue({ data: mockUser });

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    await user.click(screen.getByRole('button', { name: /Se Connecter/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });
  });
});
