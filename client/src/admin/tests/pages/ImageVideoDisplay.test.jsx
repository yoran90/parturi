import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ImagevideoDisplay from '../../pages/ImagevideoDisplay';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios
vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('ImagevideoDisplay Component', () => {

  const mockMedia = [
    { _id: '1', src: 'image1.png', type: 'image', alt: 'Image 1' },
    { _id: '2', src: 'video1.mp4', type: 'video', alt: 'Video 1' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    axios.get.mockReturnValue(new Promise(() => {})); // never resolves
    render(<ImagevideoDisplay />);
    expect(screen.getByText(/Ladataan odota/i)).toBeInTheDocument();
  });

  it('renders media after fetching', async () => {
    axios.get.mockResolvedValue({ data: { data: mockMedia } });
    render(<ImagevideoDisplay />);

    const img = await screen.findByTestId('media-image-1');
    const video = await screen.findByTestId('media-video-2');

    expect(img).toBeInTheDocument();
    expect(video).toBeInTheDocument();
  });

  it('shows "No media found" if media list is empty', async () => {
    axios.get.mockResolvedValue({ data: { data: [] } });
    render(<ImagevideoDisplay />);

    await waitFor(() => {
      expect(screen.getByText(/No media found/i)).toBeInTheDocument();
    });
  });

  it('opens modal when media is clicked', async () => {
    axios.get.mockResolvedValue({ data: { data: mockMedia } });
    render(<ImagevideoDisplay />);

    const img = await screen.findByTestId('media-image-1');
    fireEvent.click(img);

    const modalImg = await screen.findByTestId('modal-media-image');
    expect(modalImg).toBeInTheDocument();
    expect(modalImg).toHaveClass('max-w-full');
  });

  it('closes modal when close button is clicked', async () => {
    axios.get.mockResolvedValue({ data: { data: mockMedia } });
    render(<ImagevideoDisplay />);

    const img = await screen.findByTestId('media-image-1');
    fireEvent.click(img);

    const closeButton = screen.getByText('❌');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('modal-media-image')).not.toBeInTheDocument();
    });
  });

  it('deletes media successfully', async () => {
    axios.get.mockResolvedValue({ data: { data: mockMedia } });
    axios.delete.mockResolvedValue({ data: { success: true } });

    render(<ImagevideoDisplay />);

    const deleteButtons = await screen.findAllByRole('button');
    fireEvent.click(deleteButtons[0]); // delete first media

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Media deleted successfully.');
      expect(screen.queryByTestId('media-image-1')).not.toBeInTheDocument();
    });
  });

  it('handles delete failure gracefully', async () => {
    axios.get.mockResolvedValue({ data: { data: mockMedia } });
    axios.delete.mockRejectedValue(new Error('Delete failed'));

    render(<ImagevideoDisplay />);

    const deleteButtons = await screen.findAllByRole('button');
    fireEvent.click(deleteButtons[0]); // delete first media

    await waitFor(() => {
      expect(toast.success).not.toHaveBeenCalled();
      expect(screen.getByTestId('media-image-1')).toBeInTheDocument();
    });
  });

});
