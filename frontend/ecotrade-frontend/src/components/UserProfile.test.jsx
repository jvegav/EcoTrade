import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from './UserProfile';
import { productAPI, userAPI } from '../services/api';

vi.mock('../services/api', () => ({
  productAPI: {
    getProductsByUserId: vi.fn(),
  },
  userAPI: {
    getUserByEmail: vi.fn(),
  },
}));

describe('UserProfile Component', () => {
  const mockUser = {
    email: 'test@example.com',
    user_metadata: {
      name: 'Test User'
    }
  };

  const mockUserData = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User'
  };

  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      description: 'Test product 1',
      useTime: '2 mois',
      userName: 'Test User'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20.0,
      description: 'Test product 2',
      useTime: '1 mois',
      userName: 'Test User'
    }
  ];

  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Profile Header', () => {
    it('should render user profile information correctly', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
      });
    });

    it('should display user avatar with first letter of name', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('T')).toBeInTheDocument(); // First letter of "Test User"
      });
    });

    it('should display default avatar icon when user has no name', async () => {
      const userWithoutName = {
        email: 'test@example.com',
        user_metadata: {}
      };

      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: [] });

      render(<UserProfile user={userWithoutName} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('👤')).toBeInTheDocument();
      });
    });

    it('should display correct number of published products', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('2')).toBeInTheDocument(); // 2 products
        expect(screen.getByText('Produits Publiés')).toBeInTheDocument();
      });
    });
  });

  describe('Products Section', () => {
    it('should render all user products', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Test product 1')).toBeInTheDocument();
        expect(screen.getByText('Test product 2')).toBeInTheDocument();
      });
    });

    it('should display loading message while fetching products', () => {
      userAPI.getUserByEmail.mockReturnValue(new Promise(() => {}));
      productAPI.getProductsByUserId.mockReturnValue(new Promise(() => {}));

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      expect(screen.getByText('Chargement de vos produits...')).toBeInTheDocument();
    });

    it('should show message when user has no products', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: [] });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText(/Vous n'avez pas encore publié de produits/i)).toBeInTheDocument();
        expect(screen.getByText(/Commencez à vendre vos articles d'occasion/i)).toBeInTheDocument();
      });
    });

    it('should display section title', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('Mes Produits')).toBeInTheDocument();
      });
    });
  });

  describe('Back Button', () => {
    it('should render back button', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: [] });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      const backButton = await screen.findByText('← Retour');
      expect(backButton).toBeInTheDocument();
    });

    it('should call onBack when back button is clicked', async () => {
      const user = userEvent.setup();
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: [] });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      const backButton = await screen.findByText('← Retour');
      await user.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('API Calls', () => {
    it('should fetch user data on mount', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(userAPI.getUserByEmail).toHaveBeenCalledWith('test@example.com');
        expect(userAPI.getUserByEmail).toHaveBeenCalledTimes(2); // Called twice - once for userData, once for userId
      });
    });

    it('should fetch user products on mount', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(productAPI.getProductsByUserId).toHaveBeenCalledWith(1);
        expect(productAPI.getProductsByUserId).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle error when fetching user data fails', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      userAPI.getUserByEmail.mockRejectedValue(new Error('API Error'));
      productAPI.getProductsByUserId.mockResolvedValue({ data: [] });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching user data:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });

    it('should handle error when fetching products fails', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockRejectedValue(new Error('API Error'));

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching user products:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('CSS Classes', () => {
    it('should have correct CSS classes', async () => {
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: mockProducts });

      const { container } = render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(container.querySelector('.user-profile')).toBeInTheDocument();
        expect(container.querySelector('.profile-header')).toBeInTheDocument();
        expect(container.querySelector('.profile-avatar')).toBeInTheDocument();
        expect(container.querySelector('.profile-info')).toBeInTheDocument();
        expect(container.querySelector('.profile-name')).toBeInTheDocument();
        expect(container.querySelector('.profile-email')).toBeInTheDocument();
        expect(container.querySelector('.products-grid')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should render with single product', async () => {
      const singleProduct = [mockProducts[0]];
      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: singleProduct });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Product count
      });
    });

    it('should render with many products', async () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: 10.0 * (i + 1),
        description: `Test product ${i + 1}`,
        useTime: `${i + 1} mois`,
        userName: 'Test User'
      }));

      userAPI.getUserByEmail.mockResolvedValue({ data: mockUserData });
      productAPI.getProductsByUserId.mockResolvedValue({ data: manyProducts });

      render(<UserProfile user={mockUser} onBack={mockOnBack} />);

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 10')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument(); // Product count
      });
    });
  });
});
