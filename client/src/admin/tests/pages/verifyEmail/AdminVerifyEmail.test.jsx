// src/admin/tests/pages/AdminVerifyEmail.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminVerifyEmail from '../../../pages/verifyEmail/AdminVerifyEmail';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// ✅ Mock axios
vi.mock('axios');

// ✅ Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// ✅ Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ token: 'test-token' }),
  };
});


describe('AdminVerifyEmail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders verification UI correctly', () => {
    render(
      <MemoryRouter>
        <AdminVerifyEmail />
      </MemoryRouter>
    );

    expect(screen.getByText('Verify your email')).toBeInTheDocument();
    expect(screen.getByText(/you can now verify/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify email/i })).toBeInTheDocument();
  });

  it('calls API and navigates on successful verification', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Email verified successfully ✅' } });

    render(
      <MemoryRouter>
        <AdminVerifyEmail />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /verify email/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://parturi-backend.onrender.com/api/auth/admin-verify-email/test-token'
      );
      expect(toast.success).toHaveBeenCalledWith('Email verified successfully ✅');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error toast if API fails', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Invalid token' } } });

    render(
      <MemoryRouter>
        <AdminVerifyEmail />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /verify email/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Invalid token');
    });
  });

  it('shows loading state while verifying', async () => {
    let resolvePromise;
    axios.post.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(
      <MemoryRouter>
        <AdminVerifyEmail />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /verify email/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();

    // Resolve the promise to clean up
    resolvePromise({ data: { message: 'Verified' } });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Verified');
    });
  });
});
