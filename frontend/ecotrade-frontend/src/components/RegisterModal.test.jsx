import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterModal from './RegisterModal';
import { userAPI } from '../services/api';

vi.mock('../services/api', () => ({
  userAPI: {
    createUser: vi.fn(),
  },
}));

describe('RegisterModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnRegisterSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders registration form correctly', () => {
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    expect(screen.getByText('Créer un Compte')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre nom complet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Minimum 6 caractères')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Votre pays d'origine")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
  });

  it('allows user to type in all form fields', async () => {
    const user = userEvent.setup();
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    const nameInput = screen.getByPlaceholderText('Votre nom complet');
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Minimum 6 caractères');
    const nationalityInput = screen.getByPlaceholderText("Votre pays d'origine");

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(nationalityInput, 'France');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(nationalityInput).toHaveValue('France');
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal when clicking on overlay', async () => {
    const user = userEvent.setup();
    const { container } = render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    const overlay = container.querySelector('.modal-overlay');
    await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('successfully registers a new user', async () => {
    const user = userEvent.setup();
    const mockNewUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      nationality: 'France'
    };

    userAPI.createUser.mockResolvedValue({ data: mockNewUser });

    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    await user.type(screen.getByPlaceholderText('Votre nom complet'), 'John Doe');
    await user.type(screen.getByPlaceholderText('votre@email.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Minimum 6 caractères'), 'password123');
    await user.type(screen.getByPlaceholderText("Votre pays d'origine"), 'France');
    await user.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(userAPI.createUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        nationality: 'France'
      });
      expect(mockOnRegisterSuccess).toHaveBeenCalledWith(mockNewUser);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows error message when registration fails', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Email déjà utilisé';
    userAPI.createUser.mockRejectedValue({
      response: { data: errorMessage }
    });

    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    await user.type(screen.getByPlaceholderText('Votre nom complet'), 'John Doe');
    await user.type(screen.getByPlaceholderText('votre@email.com'), 'existing@example.com');
    await user.type(screen.getByPlaceholderText('Minimum 6 caractères'), 'password123');
    await user.type(screen.getByPlaceholderText("Votre pays d'origine"), 'France');
    await user.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(mockOnRegisterSuccess).not.toHaveBeenCalled();
    });
  });

  it('shows generic error message when error has no response data', async () => {
    const user = userEvent.setup();
    userAPI.createUser.mockRejectedValue(new Error('Network error'));

    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    await user.type(screen.getByPlaceholderText('Votre nom complet'), 'John Doe');
    await user.type(screen.getByPlaceholderText('votre@email.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Minimum 6 caractères'), 'password123');
    await user.type(screen.getByPlaceholderText("Votre pays d'origine"), 'France');
    await user.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText("Erreur lors de la création de l'utilisateur. Veuillez réessayer.")).toBeInTheDocument();
    });
  });

  it('disables submit button while loading', async () => {
    const user = userEvent.setup();
    userAPI.createUser.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    await user.type(screen.getByPlaceholderText('Votre nom complet'), 'John Doe');
    await user.type(screen.getByPlaceholderText('votre@email.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Minimum 6 caractères'), 'password123');
    await user.type(screen.getByPlaceholderText("Votre pays d'origine"), 'France');
    
    const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
    await user.click(submitButton);

    expect(screen.getByText('Création du compte...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('stores new user in localStorage on successful registration', async () => {
    const user = userEvent.setup();
    const mockNewUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      nationality: 'France'
    };

    userAPI.createUser.mockResolvedValue({ data: mockNewUser });

    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    await user.type(screen.getByPlaceholderText('Votre nom complet'), 'John Doe');
    await user.type(screen.getByPlaceholderText('votre@email.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Minimum 6 caractères'), 'password123');
    await user.type(screen.getByPlaceholderText("Votre pays d'origine"), 'France');
    await user.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockNewUser));
    });
  });

  it('enforces minimum password length of 6 characters', () => {
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    const passwordInput = screen.getByPlaceholderText('Minimum 6 caractères');
    expect(passwordInput).toHaveAttribute('minLength', '6');
  });
});
