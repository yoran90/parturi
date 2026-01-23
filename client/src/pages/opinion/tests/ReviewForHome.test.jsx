import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import ReviewForHome from '../ReviewForHome';

vi.mock('axios');

const mockReviews = [
  {
    _id: 'review1',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date('2023-01-01').toISOString(),
    profileImage: 'john.jpg',
    gender: 'men',
    rating: 4,
    reviewText: 'Great product!',
  },
  {
    _id: 'review2',
    firstName: 'Jane',
    lastName: 'Smith',
    createdAt: new Date('2023-02-01').toISOString(),
    profileImage: null,
    gender: 'women',
    rating: 5,
    reviewText: 'Excellent!',
  },
];

describe('ReviewForHome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders reviews fetched from API', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });

    render(<ReviewForHome />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Great product!')).toBeInTheDocument();
      expect(screen.getByText('Excellent!')).toBeInTheDocument();
    });
  });

  it('renders correct number of filled and empty stars', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });

    render(<ReviewForHome />);

    await waitFor(() => {
      const filledStars = screen.getAllByTestId('star-fill');
      const emptyStars = screen.getAllByTestId('star-empty');

      // John has 4/5 stars, Jane has 5/5 stars
      expect(filledStars.length).toBe(9); // 4 + 5
      expect(emptyStars.length).toBe(1);  // only John has 1 empty star
    });
  });

  it('renders profile images correctly', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });

    render(<ReviewForHome />);

    await waitFor(() => {
      const johnImg = screen.getByAltText('profile-John-Doe');
      expect(johnImg).toHaveAttribute('src', 'john.jpg');

      const janeImg = screen.getByAltText('profile-Jane-Smith');
      expect(janeImg).toHaveAttribute(
        'src',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s'
      );
    });
  });

  it('renders the review rating text', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });

    render(<ReviewForHome />);

    await waitFor(() => {
      expect(screen.getByText('4 / 5')).toBeInTheDocument();
      expect(screen.getByText('5 / 5')).toBeInTheDocument();
    });
  });

  it('renders line-clamped review text', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });

    render(<ReviewForHome />);

    await waitFor(() => {
      expect(screen.getByText('Great product!')).toBeInTheDocument();
      expect(screen.getByText('Excellent!')).toBeInTheDocument();
    });
  });

  it('handles empty API response gracefully', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<ReviewForHome />);

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});
