// src/admin/tests/pages/resetPassword/AdminResetPassword.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminResetPasssword from '../../../pages/forgotPassword/AdminResetPasssword';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock axios
vi.mock('axios');

const renderWithRouter = (ui, { route = '/reset-password/test-token' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/reset-password/:token" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AdminResetPasssword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form correctly', async () => {
    renderWithRouter(<AdminResetPasssword />);

    // Heading
    const heading = await screen.findByRole('heading', { name: /Password Reset/i });
    expect(heading).toBeInTheDocument();

    // Inputs
    expect(screen.getByPlaceholderText(/type your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your confirm new password/i)).toBeInTheDocument();

    // Button
    expect(screen.getByRole('button', { name: /Change Password/i })).toBeInTheDocument();

    // Back link
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it('shows validation error if fields are empty', async () => {
    renderWithRouter(<AdminResetPasssword />);
    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('All fields are required');
    });
  });

  it('shows validation error if passwords do not match', async () => {
    renderWithRouter(<AdminResetPasssword />);

    fireEvent.change(screen.getByPlaceholderText(/type your password/i), {
      target: { value: 'password1' },
    });
    fireEvent.change(screen.getByPlaceholderText(/type your confirm new password/i), {
      target: { value: 'password2' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Passwords do not match');
    });
  });

  it('submits form successfully', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Password reset successful ✅' } });

    renderWithRouter(<AdminResetPasssword />);

    fireEvent.change(screen.getByPlaceholderText(/type your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/type your confirm new password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8001/api/auth/admin-reset-password/test-token',
        { password: 'password123', confirmPassword: 'password123' }
      );
      expect(toast.success).toHaveBeenCalledWith('Password reset successful ✅');
    });
  });

  it('shows toast error if axios request fails', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    renderWithRouter(<AdminResetPasssword />);

    fireEvent.change(screen.getByPlaceholderText(/type your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/type your confirm new password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('shows loading spinner while submitting', async () => {
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    axios.post.mockReturnValue(promise);

    renderWithRouter(<AdminResetPasssword />);

    fireEvent.change(screen.getByPlaceholderText(/type your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/type your confirm new password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    // Spinner should appear
    expect(screen.getByText(/Resetting/i)).toBeInTheDocument();

    // Resolve axios
    resolvePromise({ data: { message: 'Password reset successful ✅' } });

    await waitFor(() => {
      expect(screen.queryByText(/Resetting/i)).not.toBeInTheDocument();
    });
  });
});
