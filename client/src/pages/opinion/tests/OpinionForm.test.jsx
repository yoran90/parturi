import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OpinionForm from '../OpinionForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// --------------------
// Mocks
// --------------------
vi.mock('axios');

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
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

global.URL.createObjectURL = vi.fn(() => 'mock-preview-url');

// --------------------
// Test data
// --------------------
const mockCloseModal = vi.fn();

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  gender: 'men',
  profileImage: {
    url: 'https://example.com/avatar.jpg',
  },
};

// --------------------
// Tests
// --------------------
describe('OpinionForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((cb) =>
      cb({
        userAuth: {
          user: mockUser,
        },
      })
    );
  });

  it('renders user info and form', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/kerro mista kokemuksistasi/i)).toBeInTheDocument();
    expect(screen.getByText('Julkaise')).toBeInTheDocument();
  });

  it('updates review text on change', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Great place!' } });

    expect(textarea.value).toBe('Great place!');
  });

  it('shows validation error if review text is too short', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Hey' },
    });

    fireEvent.click(screen.getByText('Julkaise'));

    expect(toast.error).toHaveBeenCalledWith(
      'Review text must be at least 5 characters long.'
    );
  });


  it('shows validation error if rating is not selected', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Amazing service!' },
    });

    fireEvent.click(screen.getByText('Julkaise'));

    expect(toast.error).toHaveBeenCalledWith(
      'Please select a rating.'
    );
  });


  it('uploads file and shows preview', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    const input = screen.getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('submits form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Amazing service and friendly staff!' },
    });

    fireEvent.click(screen.getByTestId('star-rating'));
    fireEvent.click(screen.getByText('Julkaise'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://parturi-backend.onrender.com/api/reviwes/addReview',
        expect.any(FormData),
        { withCredentials: true }
      );

      expect(toast.success).toHaveBeenCalledWith(
        'Review added successfully.'
      );

      expect(mockCloseModal).toHaveBeenCalled();
    });
  });


  it('shows loading state while submitting', async () => {
    axios.post.mockImplementation(() => new Promise(() => {}));

    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'This place is awesome!' },
    });

    fireEvent.click(screen.getByTestId('star-rating'));
    fireEvent.click(screen.getByText('Julkaise'));

    expect(await screen.findByText('Ladataan')).toBeInTheDocument();
    expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('closes modal when cancel button is clicked', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    fireEvent.click(screen.getByText('Peru'));

    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('closes modal when close icon is clicked', () => {
    render(<OpinionForm closeModel={mockCloseModal} isOpen={true} />);

    fireEvent.click(screen.getByText('❌'));

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
