import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal';
import { supabase } from '../services/supabase';

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
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
      id: '123',
      email: 'test@example.com',
      user_metadata: { name: 'Test User' }
    };
    const mockSession = {
      access_token: 'mock-token',
      refresh_token: 'mock-refresh-token'
    };

    supabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null
    });

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    await user.click(screen.getByRole('button', { name: /Se Connecter/i }));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(mockOnLoginSuccess).toHaveBeenCalledWith(mockUser);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows error message when login fails', async () => {
    const user = userEvent.setup();
    
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' }
    });

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /Se Connecter/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid login credentials')).toBeInTheDocument();
      expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
  });

  it('disables submit button while loading', async () => {
    const user = userEvent.setup();
    
    supabase.auth.signInWithPassword.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(<LoginModal onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    await user.type(screen.getByPlaceholderText('votre@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Votre mot de passe'), 'password123');
    
    const submitButton = screen.getByRole('button', { name: /Se Connecter/i });
    await user.click(submitButton);

    expect(screen.getByText('Connexion...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  
    
});
