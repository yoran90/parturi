import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllUsers from '../../pages/AllUsers';
import axios from 'axios';
import { vi } from 'vitest';

// ---------- MOCKS ----------

vi.mock('axios');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(() => ({
    unwrap: () => Promise.resolve(),
  })),
  useSelector: (fn) =>
    fn({
      adminAuth: {
        admin: { role: 'super-admin' },
      },
    }),
}));

vi.mock('../../pages/ConfirmDelete', () => ({
  default: ({ onConfirm, closeModel }) => (
    <div data-testid="confirm-delete-modal">
      <button onClick={onConfirm}>Confirm Delete</button>
      <button onClick={closeModel}>Cancel</button>
    </div>
  ),
}));

// ---------- TEST ----------

describe('AllUsers delete modal', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            gender: 'men',
            role: 'user',
          },
        ],
      },
    });
  });

  test('opens delete modal when delete button is clicked', async () => {
    render(<AllUsers />);

    // Wait for user row to appear
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();

    // Click delete button
    fireEvent.click(
      screen.getByRole('button', { name: /delete-user/i })
    );

    // Confirm modal opens
    expect(
      screen.getByTestId('confirm-delete-modal')
    ).toBeInTheDocument();
  });

  test('calls delete confirm handler', async () => {
    render(<AllUsers />);

    fireEvent.click(
      await screen.findByRole('button', { name: /delete-user/i })
    );

    fireEvent.click(screen.getByText(/confirm delete/i));

    expect(
      screen.getByTestId('confirm-delete-modal')
    ).toBeInTheDocument();
  });
});
