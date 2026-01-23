import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditReview from '../EditReview';
import axios from 'axios';

vi.mock('axios');

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn() },
}));

vi.mock('../StartRating', () => ({
  default: ({ rating, setRating }) => (
    <button data-testid="star-rating" onClick={() => setRating(5)}>
      Rating: {rating}
    </button>
  ),
}));

vi.mock('../../../loading/Loading', () => ({
  default: () => <div data-testid="loading-spinner" />,
}));

global.URL.createObjectURL = vi.fn(() => 'mock-url');

const mockCloseModal = vi.fn();
const mockFetchReviews = vi.fn();

const mockItem = {
  _id: 'review123',
  reviewText: 'Initial review text',
  rating: 4,
  mediaReview: {
    type: 'image',
    url: 'https://example.com/image.jpg',
  },
};

describe('EditReview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial review data', async () => {
    render(
      <EditReview
        closeModel={mockCloseModal}
        item={mockItem}
        fetchReviwes={mockFetchReviews}
      />
    );

    expect(await screen.findByDisplayValue('Initial review text')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 4');
  });

  it('updates review text on change', () => {
    render(
      <EditReview closeModel={mockCloseModal} item={mockItem} fetchReviwes={mockFetchReviews} />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Updated review' } });

    expect(textarea.value).toBe('Updated review');
  });

  it('submits form and calls API successfully', async () => {
    axios.put.mockResolvedValueOnce({});

    render(
      <EditReview closeModel={mockCloseModal} item={mockItem} fetchReviwes={mockFetchReviews} />
    );

    fireEvent.click(screen.getByText('Save Change'));

    await waitFor(() => expect(axios.put).toHaveBeenCalled());
    expect(mockFetchReviews).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('shows loading spinner while submitting', async () => {
    axios.put.mockImplementation(() => new Promise(() => {}));

    render(
      <EditReview
        closeModel={mockCloseModal}
        item={mockItem}
        fetchReviwes={mockFetchReviews}
      />
    );

    fireEvent.click(screen.getByText('Save Change'));

    // ⬇️ wait for UI instead of forcing it
    expect(await screen.findByText('Saving')).toBeInTheDocument();
    expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument();
  });


  it('closes modal when close button is clicked', () => {
    render(
      <EditReview closeModel={mockCloseModal} item={mockItem} fetchReviwes={mockFetchReviews} />
    );

    fireEvent.click(screen.getByText('❌'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('updates rating when StarRating is clicked', async () => {
    render(
      <EditReview closeModel={mockCloseModal} item={mockItem} fetchReviwes={mockFetchReviews} />
    );

    fireEvent.click(screen.getByTestId('star-rating'));

    await waitFor(() =>
      expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 5')
    );
  });
});
