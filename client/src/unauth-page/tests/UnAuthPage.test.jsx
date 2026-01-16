import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import UnAuthPage from '../UnAuthPage';

// Mock react-router-dom useLocation
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('UnAuthPage component', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly without message', () => {
    useLocation.mockReturnValue({ state: {} });

    render(<UnAuthPage />);

    // Check heading
    expect(screen.getByRole('heading', { name: /You don't have access to view this page/i })).toBeInTheDocument();

    // Check paragraphs
    expect(screen.getByText(/The page may have been moved or deleted/i)).toBeInTheDocument();
    expect(screen.getByText(/There could be an issue with the link you followed/i)).toBeInTheDocument();
    expect(screen.getByText(/There might be a temporary problem with our server/i)).toBeInTheDocument();
    expect(screen.getByText(/But don’t worry! We're on it and working hard/i)).toBeInTheDocument();

    // toast.error should not be called
    expect(toast.error).not.toHaveBeenCalled();
  });

  test('calls toast.error if message exists', () => {
    const testMessage = 'Unauthorized access!';
    useLocation.mockReturnValue({ state: { message: testMessage } });

    render(<UnAuthPage />);

    // toast.error should be called once with message
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(testMessage);
  });
});
