import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header Component', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    user_metadata: {
      name: 'Test User'
    }
  };

  it('renders EcoTrade logo', () => {
    render(<Header />);
    expect(screen.getByText('EcoTrade')).toBeInTheDocument();
  });

  it('shows login and register buttons when user is not logged in', () => {
    render(
      <Header
        user={null}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />
    );

    expect(screen.getByText('Se Connecter')).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });



  it('calls onLoginClick when login button is clicked', async () => {
    const onLoginClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        user={null}
        onLoginClick={onLoginClick}
        onRegisterClick={() => {}}
      />
    );

    await user.click(screen.getByText('Se Connecter'));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  it('calls onRegisterClick when register button is clicked', async () => {
    const onRegisterClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        user={null}
        onLoginClick={() => {}}
        onRegisterClick={onRegisterClick}
      />
    );

    await user.click(screen.getByText("S'inscrire"));
    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });

  it('calls onAddProductClick when add product button is clicked', async () => {
    const onAddProductClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        user={mockUser}
        onAddProductClick={onAddProductClick}
        onLogout={() => {}}
        onProfileClick={() => {}}
      />
    );

    await user.click(screen.getByText('+ Ajouter un Produit'));
    expect(onAddProductClick).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when logout button is clicked', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        user={mockUser}
        onAddProductClick={() => {}}
        onLogout={onLogout}
        onProfileClick={() => {}}
      />
    );

    await user.click(screen.getByText('Déconnexion'));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('calls onLogoClick when logo is clicked', async () => {
    const onLogoClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        user={null}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogoClick={onLogoClick}
      />
    );

    await user.click(screen.getByText('EcoTrade'));
    expect(onLogoClick).toHaveBeenCalledTimes(1);
  });

  it('calls onProfileClick when profile button is clicked', async () => {
    const onProfileClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        user={mockUser}
        onAddProductClick={() => {}}
        onLogout={() => {}}
        onProfileClick={onProfileClick}
      />
    );

    await user.click(screen.getByText('👤 Mon Profil'));
    expect(onProfileClick).toHaveBeenCalledTimes(1);
  });
});
