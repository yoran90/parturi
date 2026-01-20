import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VerifyEmail from '../VerifyEmail'; // Adjust path as necessary
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/verify-email/mock-token']}>
      <VerifyEmail />
    </MemoryRouter>
  );
};

describe('VerifyEmail', () => {
  it('renders the VerifyEmail component correctly', () => {
    setup();

    expect(screen.getByText('Verify your email')).toBeInTheDocument();
    expect(
      screen.getByText('You can now verify your email to start using our services ✅')
    ).toBeInTheDocument();
    expect(
      screen.getByText('If you did not create an account, you can ignore this email')
    ).toBeInTheDocument();
  });

  it('shows loading state when the button is clicked', async () => {
    setup();

    const verifyButton = screen.getByRole('button', { name: /verify email/i });

    fireEvent.click(verifyButton);

    // Check if the button text changes or loading indicator is visible (this is just an example)
    expect(verifyButton).toHaveTextContent('Verifying');
  });

  it('handles successful email verification', async () => {
    setup();

    const mockToken = 'mock-token';
    axios.post.mockResolvedValueOnce({
      data: { message: 'Email successfully verified!' },
    });

    const verifyButton = screen.getByRole('button', { name: /verify email/i });

    fireEvent.click(verifyButton);

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Email successfully verified!'));
  });

  it('handles failed email verification', async () => {
    setup();

    const mockToken = 'mock-token';
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Verification failed!' } },
    });

    const verifyButton = screen.getByRole('button', { name: /verify email/i });

    fireEvent.click(verifyButton);

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Verification failed!'));
  });

  it('disables the verify button while the request is in progress', async () => {
    setup();

    axios.post.mockImplementationOnce(() =>
      new Promise((resolve) => setTimeout(() => resolve({}), 1000))
    );

    const verifyButton = screen.getByRole('button', { name: /verify email/i });
    
    fireEvent.click(verifyButton);

    // Ensure the button is disabled while waiting for the API response
    expect(verifyButton).toBeDisabled();
  });
});
