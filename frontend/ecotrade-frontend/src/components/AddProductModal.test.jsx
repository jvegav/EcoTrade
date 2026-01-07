import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProductModal from './AddProductModal';
import { productAPI } from '../services/api';

vi.mock('../services/api', () => ({
  productAPI: {
    createProduct: vi.fn(),
  },
}));

describe('AddProductModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnProductAdded = vi.fn();
  const userId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders add product form correctly', () => {
    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    expect(screen.getByText('Ajouter un Produit')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: Lampe de bureau')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('15.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: 6 mois, 1 an')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Publier le Produit/i })).toBeInTheDocument();
  });

  it('allows user to type in all form fields', async () => {
    const user = userEvent.setup();
    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    const nameInput = screen.getByPlaceholderText('Ex: Lampe de bureau');
    const priceInput = screen.getByPlaceholderText('15.00');
    const descriptionInput = screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit...");
    const useTimeInput = screen.getByPlaceholderText('Ex: 6 mois, 1 an');

    await user.type(nameInput, 'Desk Lamp');
    await user.type(priceInput, '25.50');
    await user.type(descriptionInput, 'Good condition, LED lamp');
    await user.type(useTimeInput, '6 mois');

    expect(nameInput).toHaveValue('Desk Lamp');
    expect(priceInput).toHaveValue(25.50);
    expect(descriptionInput).toHaveValue('Good condition, LED lamp');
    expect(useTimeInput).toHaveValue('6 mois');
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal when clicking on overlay', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    const overlay = container.querySelector('.modal-overlay');
    await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('successfully creates a product', async () => {
    const user = userEvent.setup();
    const mockProduct = {
      id: 1,
      name: 'Desk Lamp',
      price: 25.50,
      description: 'Good condition, LED lamp',
      useTime: '6 mois',
      userId: 1
    };

    productAPI.createProduct.mockResolvedValue({ data: mockProduct });

    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    await user.type(screen.getByPlaceholderText('Ex: Lampe de bureau'), 'Desk Lamp');
    await user.type(screen.getByPlaceholderText('15.00'), '25.50');
    await user.type(screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit..."), 'Good condition, LED lamp');
    await user.type(screen.getByPlaceholderText('Ex: 6 mois, 1 an'), '6 mois');
    await user.click(screen.getByRole('button', { name: /Publier le Produit/i }));

    await waitFor(() => {
      expect(productAPI.createProduct).toHaveBeenCalledWith(userId, {
        name: 'Desk Lamp',
        price: 25.50,
        description: 'Good condition, LED lamp',
        useTime: '6 mois'
      });
      expect(mockOnProductAdded).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows error message when product creation fails', async () => {
    const user = userEvent.setup();
    productAPI.createProduct.mockRejectedValue(new Error('Server error'));

    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    await user.type(screen.getByPlaceholderText('Ex: Lampe de bureau'), 'Desk Lamp');
    await user.type(screen.getByPlaceholderText('15.00'), '25.50');
    await user.type(screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit..."), 'Good condition, LED lamp');
    await user.type(screen.getByPlaceholderText('Ex: 6 mois, 1 an'), '6 mois');
    await user.click(screen.getByRole('button', { name: /Publier le Produit/i }));

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la création du produit. Veuillez réessayer.')).toBeInTheDocument();
      expect(mockOnProductAdded).not.toHaveBeenCalled();
    });
  });

  it('disables submit button while loading', async () => {
    const user = userEvent.setup();
    productAPI.createProduct.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    await user.type(screen.getByPlaceholderText('Ex: Lampe de bureau'), 'Desk Lamp');
    await user.type(screen.getByPlaceholderText('15.00'), '25.50');
    await user.type(screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit..."), 'Good condition');
    await user.type(screen.getByPlaceholderText('Ex: 6 mois, 1 an'), '6 mois');
    
    const submitButton = screen.getByRole('button', { name: /Publier le Produit/i });
    await user.click(submitButton);

    expect(screen.getByText('Publication...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('converts price string to float number', async () => {
    const user = userEvent.setup();
    productAPI.createProduct.mockResolvedValue({ data: {} });

    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    await user.type(screen.getByPlaceholderText('Ex: Lampe de bureau'), 'Test Product');
    await user.type(screen.getByPlaceholderText('15.00'), '99.99');
    await user.type(screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit..."), 'Description');
    await user.type(screen.getByPlaceholderText('Ex: 6 mois, 1 an'), '1 an');
    await user.click(screen.getByRole('button', { name: /Publier le Produit/i }));

    await waitFor(() => {
      expect(productAPI.createProduct).toHaveBeenCalledWith(
        userId,
        expect.objectContaining({
          price: 99.99
        })
      );
    });
  });

  it('enforces minimum price of 0', () => {
    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    const priceInput = screen.getByPlaceholderText('15.00');
    expect(priceInput).toHaveAttribute('min', '0');
    expect(priceInput).toHaveAttribute('step', '0.01');
  });

  it('requires all fields to be filled', () => {
    render(
      <AddProductModal
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
        userId={userId}
      />
    );

    expect(screen.getByPlaceholderText('Ex: Lampe de bureau')).toBeRequired();
    expect(screen.getByPlaceholderText('15.00')).toBeRequired();
    expect(screen.getByPlaceholderText("Décrivez l'état et les caractéristiques du produit...")).toBeRequired();
    expect(screen.getByPlaceholderText('Ex: 6 mois, 1 an')).toBeRequired();
  });
});
