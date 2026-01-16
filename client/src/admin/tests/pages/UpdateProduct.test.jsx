import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateProduct from '../../pages/UpdateProduct';
import axios from 'axios';
import { toast } from 'react-toastify';



// ✅ Mock axios
vi.mock('axios');

// ✅ Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// ✅ Mock Loading component
vi.mock('../../loading/Loading', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

// ✅ Helper to create fake File
const createFakeFile = (name, type = 'image/png') => {
  return new File(['dummy content'], name, { type });
};

// Mock URL.createObjectURL for file inputs
beforeAll(() => {
  global.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
});
afterAll(() => {
  global.URL.createObjectURL.mockReset();
});


// ✅ Mock product
const mockProduct = {
  _id: '123',
  title: 'Product 1',
  price: 100,
  discount: 10,
  description: 'Description',
  images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
};

// ✅ Render component helper
const renderComponent = (props = {}) => {
  return render(
    <UpdateProduct
      product={mockProduct}
      refreshProducts={vi.fn()}
      closeModal={vi.fn()}
      {...props}
    />
  );
};

describe('UpdateProduct Component with Cloudinary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form with product data', () => {
    renderComponent();

    expect(screen.getByDisplayValue('Product 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByAltText('image')).toHaveAttribute('src', mockProduct.images[0]);
  });

  it('uploads a new image (Cloudinary mock) and updates images array', async () => {
    renderComponent();

    const file = new File(['dummy content'], 'new-image.png', { type: 'image/png' });
    const input = screen.getByTestId('product-image-input');
    fireEvent.change(input, { target: { files: [file] } });

    const images = await screen.findAllByAltText('image'); // waits for DOM
    expect(images.length).toBe(1); // ✅ only new file
    expect(images[0].src).toContain('blob:new-image.png');
  });




  it('removes an image when delete button clicked', async () => {
    renderComponent();

    // Make sure image exists
    const image = screen.getByAltText('image');
    expect(image).toHaveAttribute('src', mockProduct.images[0]);

    const deleteButton = screen.getByLabelText('delete-image-0');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const remainingImages = screen.queryAllByAltText('image');
      expect(remainingImages.every(img => !img.src.includes('sample.jpg'))).toBe(true);
    });
  });


  it('shows toast errors when required fields are empty', async () => {
    renderComponent({ product: { ...mockProduct, title: '' } });

    const button = screen.getByText('Update Product');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please add a title');
    });
  });

  it('shows loading spinner while submitting', async () => {
    axios.put.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ status: 200, data: { ...mockProduct } }), 100)
        )
    );

    renderComponent();

    const button = screen.getByText('Update Product');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Adding')).toBeInTheDocument();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });
});
