import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SingleReview from '../../pages/SingleReview';


let mockLoadingForButton = false;


const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => mockNavigate,
  };
});


vi.mock('../../../hooks/useReviews', () => ({
  useReviewById: () => ({
    getReview: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      gender: 'men',
      rating: 4,
      comments: ['c1', 'c2'],
      likes: { count: 10 },
      createdAt: '2024-01-01T00:00:00.000Z',
      reviewText: 'Great product!',
      profileImage: null,
      mediaReview: {
        type: 'image',
        url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      },
    },
  }),

  useDeleteReviewById: () => ({
    deleteReview: vi.fn(),
    deleteReviewHnadler: vi.fn(() => Promise.resolve()),
    loadingForButton: mockLoadingForButton,
  }),
}));


vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock('../../../loading/Loading', () => ({
  default: () => <span>loading...</span>,
}));


describe('SingleReview Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoadingForButton = false;
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SingleReview />
      </MemoryRouter>
    );

  it('renders review user information', () => {
    renderComponent();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
    expect(screen.getByText('men')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
  });

  it('renders correct number of filled stars', () => {
    renderComponent();

    const filledStars = document.querySelectorAll('.text-yellow-500');
    expect(filledStars.length).toBe(4);
  });

  it('renders review media image (Cloudinary)', () => {
    const { container } = renderComponent();

    const images = container.querySelectorAll('img');

    const mediaImage = [...images].find(img =>
      img.src.includes('cloudinary')
    );

    expect(mediaImage).toBeTruthy();
  });

  it('calls delete handler and navigates on remove', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/allReviews');
    });
  });

  it('shows loading state when removing', () => {
    mockLoadingForButton = true;

    renderComponent();

    expect(screen.getByText('Removing')).toBeInTheDocument();
  });
});
