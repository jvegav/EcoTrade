import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 10.00,
      useTime: '3 mois',
      userName: 'User 1'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 20.00,
      useTime: '6 mois',
      userName: 'User 2'
    }
  ];

  it('shows loading state when loading is true', () => {
    render(<ProductList products={[]} loading={true} />);

    expect(screen.getByText('Chargement des produits...')).toBeInTheDocument();
  });

  it('shows empty state when no products are available', () => {
    render(<ProductList products={[]} loading={false} />);

    expect(screen.getByText('Aucun produit disponible')).toBeInTheDocument();
    expect(screen.getByText('Soyez le premier à publier un produit!')).toBeInTheDocument();
  });

  it('shows empty state when products is null', () => {
    render(<ProductList products={null} loading={false} />);

    expect(screen.getByText('Aucun produit disponible')).toBeInTheDocument();
  });

  it('renders all products when available', () => {
    render(<ProductList products={mockProducts} loading={false} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders correct number of product cards', () => {
    const { container } = render(<ProductList products={mockProducts} loading={false} />);

    const productCards = container.querySelectorAll('.product-card');
    expect(productCards).toHaveLength(2);
  });

  it('has correct CSS class for product list', () => {
    const { container } = render(<ProductList products={mockProducts} loading={false} />);

    expect(container.querySelector('.product-list')).toBeInTheDocument();
  });

  it('prioritizes loading state over empty state', () => {
    render(<ProductList products={[]} loading={true} />);

    expect(screen.getByText('Chargement des produits...')).toBeInTheDocument();
    expect(screen.queryByText('Aucun produit disponible')).not.toBeInTheDocument();
  });
});
