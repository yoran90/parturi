import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import DisplayProduct from '../../pages/DisplayProduct';
import { toast } from 'react-toastify';

/* =======================
   MOCKS
======================= */

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: { success: vi.fn() },
}));

// Mock UpdateProduct modal
vi.mock('../../pages/UpdateProduct.jsx', () => ({
  default: ({ closeModal }) => (
    <div data-testid="update-product-modal">
      <button onClick={closeModal}>Close</button>
    </div>
  ),
}));

// Mock Loading spinner
vi.mock('../../loading/Loading', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

/* =======================
   MOCK DATA
======================= */

const mockProducts = [
  {
    _id: '1',
    title: 'Test Product One',
    price: 100,
    discount: 10,
    description: '<p>Test description</p>',
    images: [{ url: 'test-image.jpg' }],
  },
  {
    _id: '2',
    title: 'Second Product',
    price: 50,
    discount: 0,
    description: '<p>Second description</p>',
    images: [{ url: 'test2-image.jpg' }],
  },
];

/* =======================
   TESTS
======================= */

describe('DisplayProduct (Vitest)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows loading state while fetching products', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<DisplayProduct />);

    // Loader is visible initially
    expect(screen.getByText(/Ladataan odota/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });

  it('renders products after successful fetch', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    render(<DisplayProduct />);

    // wait for loader to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Ladataan odota/i)).not.toBeInTheDocument();
    });

    // 👇 multiple matches because of desktop + mobile views
    const titles1 = await screen.findAllByText(/Test Product/i);
    const titles2 = await screen.findAllByText(/Second Product/i);

    expect(titles1.length).toBeGreaterThan(0);
    expect(titles2.length).toBeGreaterThan(0);
  });




  it('shows "No product found" when API returns empty list', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<DisplayProduct />);

    expect(await screen.findByText(/No product found/i)).toBeInTheDocument();
  });

  it('opens UpdateProduct modal when edit button is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<DisplayProduct />);

    // Wait for edit buttons
    const editButtons = await screen.findAllByLabelText('edit-product');
    fireEvent.click(editButtons[0]);

    // Modal should appear
    expect(screen.getByTestId('update-product-modal')).toBeInTheDocument();
  });

  it('deletes product and shows success toast', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });
    axios.delete.mockResolvedValueOnce({ status: 200 });

    render(<DisplayProduct />);

    const deleteButtons = await screen.findAllByLabelText('delete-product');
    fireEvent.click(deleteButtons[0]); // delete first product

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'https://parturi-backend.onrender.com/api/products/deleteProduct/1',
        { withCredentials: true }
      );
    });

    expect(toast.success).toHaveBeenCalledWith(
      'Product deleted successfully.'
    );

    await waitFor(() => {
      expect(screen.queryByText(/^Test Product One$/i)).not.toBeInTheDocument();
    });
  });
});
