import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MenuGrid, MenuItem } from './MenuGrid';
import { describe, it, expect, vi } from 'vitest';
import * as menuUtils from '@/lib/menu-utils';

// Mock ImageWithFallback to avoid issues with image loading in test
vi.mock('./figma/ImageWithFallback', () => ({
  ImageWithFallback: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

const mockItems: MenuItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: `Pizza ${i + 1}`,
  description: `Description ${i + 1}`,
  price: 10 + i,
  rating: 4.5,
  reviews: 10,
  image: `image-${i + 1}.jpg`,
}));

describe('MenuGrid Pagination', () => {
  it('renders only the correct number of items per page based on util', () => {
    // Mock getMenuPageSize to return 4 (Tablet size)
    vi.spyOn(menuUtils, 'getMenuPageSize').mockReturnValue(4);

    // Mock window resize to trigger any potential listeners (if implemented later)
    // For now, we assume the component calls getMenuPageSize on mount

    render(<MenuGrid items={mockItems} onAddToCart={() => {}} />);

    // Should only show 4 items initially
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(screen.getByText('Pizza 1')).toBeInTheDocument();
    expect(screen.queryByText('Pizza 5')).not.toBeInTheDocument();
  });

  it('updates items when page changes', () => {
    vi.spyOn(menuUtils, 'getMenuPageSize').mockReturnValue(4);
    render(<MenuGrid items={mockItems} onAddToCart={() => {}} />);

    // Click page 2
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    // Should show items 5-8
    expect(screen.getByText('Pizza 5')).toBeInTheDocument();
    expect(screen.queryByText('Pizza 1')).not.toBeInTheDocument();
  });
});
