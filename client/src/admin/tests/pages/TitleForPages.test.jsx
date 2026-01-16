import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TitleForPages from '../../pages/TitleForPages';
import axios from 'axios';

// --------------------------------
// MOCKS
// --------------------------------
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

// ✅ Mock ReactQuill (CRITICAL)
vi.mock('react-quill-new', () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="quill"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

// --------------------------------
// CONTROL MOCK FOR HOOK
// --------------------------------
let mockTitleForPage = null;

vi.mock('../../../hooks/useTitleForPage', () => ({
  default: () => ({
    getTitleForPage: mockTitleForPage,
  }),
}));

// --------------------------------
// TESTS
// --------------------------------
describe('TitleForPages Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTitleForPage = null;
  });

  it('renders empty form when no data exists', () => {
    render(<TitleForPages />);

    expect(screen.getByPlaceholderText('Enter your service title')).toBeInTheDocument();
    expect(screen.getAllByTestId('quill').length).toBeGreaterThan(0);
    expect(screen.getByText('Add Save')).toBeInTheDocument();
  });

  it('initializes form when titleForPage data exists', async () => {
    mockTitleForPage = {
      titleForPage: {
        serviceTitle: 'Service',
        serviceDescription: '<p>Service desc</p>',
        galleriTitle: 'Gallery',
        galleriDescription: '<p>Gallery desc</p>',
        productTitle: 'Product',
        productDescription: '<p>Product desc</p>',
        footerTitle: 'Footer',
        footerDescription: '<p>Footer desc</p>',
        footerFooter: '<p>Footer footer</p>',
        connectionTitle: 'Connection',
        connectionDescription: '<p>Connection desc</p>',
      },
    };

    render(<TitleForPages />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Service')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Gallery')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Product')).toBeInTheDocument();
    });
  });

  it('updates input values when typing', () => {
    render(<TitleForPages />);

    const serviceTitleInput = screen.getByPlaceholderText('Enter your service title');

    fireEvent.change(serviceTitleInput, {
      target: { value: 'New Service Title' },
    });

    expect(serviceTitleInput.value).toBe('New Service Title');
  });

  it('submits POST request when no existing data', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Created successfully' },
    });

    render(<TitleForPages />);

    fireEvent.change(screen.getByPlaceholderText('Enter your service title'), {
      target: { value: 'Service Title' },
    });

    fireEvent.click(screen.getByText('Add Save'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8001/api/titleForPages/addT-Dforpage',
        expect.any(Object)
      );
    });
  });

  it('submits PUT request when data exists', async () => {
    mockTitleForPage = {
      titleForPage: {
        serviceTitle: 'Service',
      },
    };

    axios.put.mockResolvedValueOnce({
      data: { message: 'Updated successfully' },
    });

    render(<TitleForPages />);

    fireEvent.click(screen.getByText('Add Save'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:8001/api/titleForPages/updateT-Dforpage',
        expect.any(Object)
      );
    });
  });

  it('shows loading state while saving', async () => {
    let resolvePromise;

    axios.post.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    render(<TitleForPages />);

    fireEvent.click(screen.getByText('Add Save'));

    expect(await screen.findByText('Saving')).toBeInTheDocument();

    resolvePromise({
      data: { message: 'Saved' },
    });
  });
});
