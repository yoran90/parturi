import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // <--- import this
import AllReviews from '../../pages/AllReviews';

const mockUseReviews = {
  getReviews: [],
};

vi.mock('../../../hooks/useReviews', () => ({
  default: () => mockUseReviews,
}));

describe('AllReviews Component', () => {

  beforeEach(() => {
    mockUseReviews.getReviews = [];
  });

  test('renders "No reviews found" when there are no reviews', () => {
    render(
      <MemoryRouter>
        <AllReviews />
      </MemoryRouter>
    );
    expect(screen.getByText(/no reviews found/i)).toBeInTheDocument();
  });

  test('renders reviews correctly when there are reviews', () => {
    mockUseReviews.getReviews = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'men',
        createdAt: new Date('2026-01-01').toISOString(),
        rating: 4,
        likes: { count: 10 },
        comments: [{}, {}],
        reviewText: 'Great service!',
        mediaReview: { type: 'image', url: 'image-url' },
        profileImage: '',
      },
    ];

    render(
      <MemoryRouter>
        <AllReviews />
      </MemoryRouter>
    );

    expect(screen.getByText(/all reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/4 \/ 5/i)).toBeInTheDocument();
    expect(screen.getByText(/10 likes/i)).toBeInTheDocument();
    expect(screen.getByText(/2 comments/i)).toBeInTheDocument();

    const image = screen.getByAltText('review');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image-url');
  });

});
