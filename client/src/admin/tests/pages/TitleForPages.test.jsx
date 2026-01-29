import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TitleForPages from '../../pages/TitleForPages';
import axios from 'axios';

// -----------------------------
// MOCKS
// -----------------------------
vi.mock('axios');

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../../loading/Loading', () => ({
  default: () => <span>loading...</span>,
}));

vi.mock('react-quill-new', () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="quill"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

// -----------------------------
// HOOK MOCK
// -----------------------------
let mockTitleForPage = null;


vi.mock('../../../hooks/useTitleForPage', () => ({
  default: () => ({
    getTitleForPage: mockTitleForPage,
  }),
}));


// -----------------------------
// TESTS
// -----------------------------
describe('TitleForPages Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTitleForPage = null;
  });

  it('renders empty form when no data exists', async () => {
    mockTitleForPage = null;

    render(<TitleForPages />);

    expect(
      await screen.findByPlaceholderText('Enter your service title')
    ).toBeInTheDocument();

    expect(screen.getAllByTestId('quill').length).toBeGreaterThan(0);
    expect(screen.getByText('Add Save')).toBeInTheDocument();
  });

  it('initializes form when titleForPage data exists', async () => {
    mockTitleForPage = {
      titleForPage: {
        serviceTitle: 'Service',
        galleriTitle: 'Gallery',
        productTitle: 'Product',
      },
    };

    render(<TitleForPages />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Service')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Gallery')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Product')).toBeInTheDocument();
    });
  });

  it('updates input values when typing', async () => {
    mockTitleForPage = null;

    render(<TitleForPages />);

    const input = await screen.findByPlaceholderText(
      'Enter your service title'
    );

    fireEvent.change(input, {
      target: { value: 'New Service Title' },
    });

    expect(input.value).toBe('New Service Title');
  });

  it('submits POST request when no existing data', async () => {
    mockTitleForPage = null;

    axios.post.mockResolvedValueOnce({
      data: { message: 'Created successfully' },
    });

    render(<TitleForPages />);

    fireEvent.change(
      await screen.findByPlaceholderText('Enter your service title'),
      { target: { value: 'Service Title' } }
    );

    fireEvent.click(screen.getByText('Add Save'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8001/api/titleForPages/addT-Dforpage',
        expect.any(Object)
      );
    });
  });

  it('submits PUT request when existing data exists', async () => {
    mockTitleForPage = {
      titleForPage: {
        serviceTitle: 'Existing',
      },
    };

    axios.put.mockResolvedValueOnce({
      data: { message: 'Updated successfully' },
    });

    render(<TitleForPages />);

    fireEvent.click(await screen.findByText('Add Save'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:8001/api/titleForPages/updateT-Dforpage',
        expect.any(Object)
      );
    });
  });

  it('shows loading state while saving', async () => {
    mockTitleForPage = null;

    render(<TitleForPages />);

    axios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { message: 'Saved' } }), 100)
        )
    );

    fireEvent.click(await screen.findByText('Add Save'));

    await waitFor(() => {
      expect(screen.getByText(/Saving/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
