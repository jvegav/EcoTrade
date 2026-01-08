import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterModal from './RegisterModal';
import { userAPI } from '../services/api';

vi.mock('../services/api', () => ({
  userAPI: {
    createUser: vi.fn(),
    register: vi.fn(),
  },
}));

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}));

describe('RegisterModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnRegisterSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  

  it('allows user to type in all form fields', async () => {
    const user = userEvent.setup();
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    const nameInput = screen.getByPlaceholderText('Votre nom');
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const nationalityInput = screen.getByPlaceholderText("Votre nationalité");

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


  it('enforces minimum password length of 6 characters', () => {
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    expect(passwordInput).toHaveAttribute('minLength', '6');
  });

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup();
    render(<RegisterModal onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

    await user.type(screen.getByPlaceholderText('Votre nom'), 'John Doe');
    await user.type(screen.getByPlaceholderText('votre@email.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Votre nationalité'), 'France');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    await user.type(screen.getByPlaceholderText('Confirmez votre mot de passe'), 'different');
    await user.click(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
  });
});
