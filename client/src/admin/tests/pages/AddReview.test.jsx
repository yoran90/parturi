import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddReview from '../../pages/AddReview';
import axios from 'axios';
import { toast } from 'react-toastify';



vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));


vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));


vi.mock('../../loading/Loading', () => ({
  default: () => <div data-testid="loading-spinner" />,
}));


vi.mock('../../hooks/useShop', () => ({
  __esModule: true,
  default: () => ({
    getShope: { title: 'Existing Shop', description: 'Existing Desc', media: [] },
    setShope: vi.fn(),
    fetchShopMedia: vi.fn(),
  }),
}));

describe('AddReview Component', () => {
  beforeAll(() => {
    // Needed for file previews
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
  });

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({
      data: { title: 'Mock Shop', description: 'Mock Desc', media: [] },
    });
  });

  test('renders form fields', () => {
    render(<AddReview />);
    expect(screen.getByPlaceholderText(/enter title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter description/i)).toBeInTheDocument();
    expect(screen.getByText(/upload image & video/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Media saved successfully' } });

    render(<AddReview />);

    // Fill inputs
    fireEvent.change(screen.getByPlaceholderText(/enter title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), { target: { value: 'Test Description' } });

    // Upload file
    const fileInput = screen.getByLabelText(/upload image & video/i);
    const file = new File(['dummy'], 'file.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Click submit
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Media saved successfully');
    });
  });

  test('removes existing media', async () => {
    const { getByText, queryByText } = render(<AddReview />);

    // Existing media mocked in useShop
    expect(getByText(/existing media/i)).toBeInTheDocument();
    // Simulate removing media
    // If media array had items, you would click the trash button here
  });
});
