import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmDelete from '../../pages/ConfirmDelete';

vi.mock('../../loading/Loading', () => ({
  default: () => <div data-testid="loading-spinner" />,
}));

describe('ConfirmDelete Component', () => {
  const defaultProps = {
    closeModel: vi.fn(),
    onConfirm: vi.fn(),
    headerTitle: 'Confirm Delete User',
    headerDescription: 'Are you sure?',
    warningMessage: 'This action cannot be undone',
    cacelButton: 'Cancel',
    confirmButton: 'Delete',
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders modal content correctly', () => {
    render(<ConfirmDelete {...defaultProps} />);

    expect(screen.getByText(/confirm delete user/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByText(/this action cannot be undone/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('calls onConfirm when confirm button is clicked', () => {
    render(<ConfirmDelete {...defaultProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /delete/i })
    );

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls closeModel when close icon is clicked', () => {
    render(<ConfirmDelete {...defaultProps} />);

    fireEvent.click(screen.getByText('❌'));
    expect(defaultProps.closeModel).toHaveBeenCalledTimes(1);
  });

  test('shows loading spinner when loading is true', () => {
    render(<ConfirmDelete {...defaultProps} loading={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
