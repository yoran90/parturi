// src/admin/tests/pages/forgotPassword/AdminForgotPassword.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminForgotPassword from '../../../pages/forgotPassword/AdminForgotPassword';

// Mock axios
vi.mock('axios');

// Mock toast functions
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Helper to render component inside a router
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('AdminForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form correctly', async () => {
    renderWithRouter(<AdminForgotPassword />);
    
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Send reset link/i)).toBeInTheDocument();

    // Updated heading check
    const heading = await screen.findByRole('heading', { name: /Forgotten password/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(/Back to login/i)).toBeInTheDocument();
  });


  it('shows toast success when submitting valid email', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Reset link sent' } });

    renderWithRouter(<AdminForgotPassword />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'admin@example.com' },
    });

    fireEvent.click(screen.getByText(/Send reset link/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Reset link sent');
    });

    // Input should be cleared
    expect(screen.getByPlaceholderText(/Enter your email/i).value).toBe('');
  });

  it('shows toast error when axios request fails', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Email not found' } },
    });

    renderWithRouter(<AdminForgotPassword />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'admin@example.com' },
    });

    fireEvent.click(screen.getByText(/Send reset link/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email not found');
    });
  });

  it('shows loading spinner while submitting', async () => {
    // Mock a delayed response to simulate loading
    axios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { message: 'Reset link sent' } }), 100)
        )
    );

    renderWithRouter(<AdminForgotPassword />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'admin@example.com' },
    });

    fireEvent.click(screen.getByText(/Send reset link/i));

    // Check that loading text is displayed
    expect(screen.getByText(/Sending/i)).toBeInTheDocument();

    // Wait for toast to confirm async is done
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Reset link sent');
    });
  });
});
