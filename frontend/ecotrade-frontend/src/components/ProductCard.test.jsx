import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product description',
    price: 25.50,
    useTime: '6 mois',
    userName: 'John Doe'
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('€25.50')).toBeInTheDocument();
    expect(screen.getByText('6 mois')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('formats price with two decimal places', () => {
    const productWithWholePrice = { ...mockProduct, price: 30 };
    render(<ProductCard product={productWithWholePrice} />);

    expect(screen.getByText('€30.00')).toBeInTheDocument();
  });

  it('renders product placeholder emoji', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('📦')).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    expect(container.querySelector('.product-card')).toBeInTheDocument();
    expect(container.querySelector('.product-info')).toBeInTheDocument();
    expect(container.querySelector('.product-name')).toBeInTheDocument();
    expect(container.querySelector('.product-price')).toBeInTheDocument();
    expect(container.querySelector('.product-description')).toBeInTheDocument();
    expect(container.querySelector('.product-meta')).toBeInTheDocument();
  });
});
