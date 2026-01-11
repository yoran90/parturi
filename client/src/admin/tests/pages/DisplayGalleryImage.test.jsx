import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplayGalleryImage from '../../pages/DisplayGalleryImage';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGallery from '../../../hooks/useGallery';

// ✅ MOCKS
vi.mock('../../../hooks/useGallery', () => ({
  default: vi.fn(),
}));

vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('DisplayGalleryImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ✅ 1. Loader state
  test('shows loader when loading is true', () => {
    useGallery.mockReturnValue({
      galleryImages: [],
      setGalleryImages: vi.fn(),
      loading: true,
    });

    render(<DisplayGalleryImage />);

    expect(screen.getByText(/ladataan odota/i)).toBeInTheDocument();
  });

  // ✅ 2. Empty gallery
  test('shows "No Gallery Images Found" when empty', () => {
    useGallery.mockReturnValue({
      galleryImages: [],
      setGalleryImages: vi.fn(),
      loading: false,
    });

    render(<DisplayGalleryImage />);

    expect(
      screen.getByText(/no gallery images found/i)
    ).toBeInTheDocument();
  });


  test('renders gallery images', async () => {
    useGallery.mockReturnValue({
      galleryImages: [
        { url: 'img1.jpg', galleryId: '1', publicId: 'p1' },
        { url: 'img2.jpg', galleryId: '2', publicId: 'p2' },
      ],
      setGalleryImages: vi.fn(),
      loading: false,
    });

    render(<DisplayGalleryImage />);

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(2);
      expect(
        screen.getAllByRole('button', { name: /delete-gallery-image/i })
      ).toHaveLength(2);
    });
  });



  test('deletes gallery image successfully', async () => {
    const setGalleryImages = vi.fn();

    useGallery.mockReturnValue({
      galleryImages: [
        { url: 'img1.jpg', galleryId: '1', publicId: 'p1' },
      ],
      setGalleryImages,
      loading: false,
    });

    axios.delete.mockResolvedValueOnce({
      data: { success: true },
    });

    render(<DisplayGalleryImage />);

    fireEvent.click(
      screen.getByLabelText('delete-gallery-image-p1')
    );

    await waitFor(() => {
      expect(setGalleryImages).toHaveBeenCalledWith([]);
      expect(toast.success).toHaveBeenCalledWith(
        'Gallery image deleted successfully'
      );
    });
  });


 
  test('shows error toast if delete fails', async () => {
    useGallery.mockReturnValue({
      galleryImages: [
        { url: 'img1.jpg', galleryId: '1', publicId: 'p1' },
      ],
      setGalleryImages: vi.fn(),
      loading: false,
    });

    axios.delete.mockRejectedValueOnce(new Error('Network error'));

    render(<DisplayGalleryImage />);

    const deleteButton = screen.getByLabelText('delete-gallery-image-p1');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to delete image'
      );
    });
  });
});
