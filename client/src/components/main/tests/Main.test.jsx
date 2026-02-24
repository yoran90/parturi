import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Main from '../Main';
import axios from 'axios';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('axios');

// ✅ Mock video play() (JSDOM does not implement it)
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn(),
});

const mockMedia = [
  {
    id: 1,
    type: 'image',
    src: 'https://res.cloudinary.com/demo/image/upload/v1/hero.jpg',
    alt: 'Hero Image'
  },
  {
    id: 2,
    type: 'video',
    src: 'https://res.cloudinary.com/demo/video/upload/v1/intro.mp4'
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

const renderWithMedia = async () => {
  axios.get.mockResolvedValueOnce({ data: { data: mockMedia } });

  await act(async () => {
    render(<Main />);
  });
};

describe('Main (Cloudinary media)', () => {

  it('shows loading initially', () => {
    // return empty media so loading screen appears
    axios.get.mockResolvedValueOnce({ data: { data: [] } });

    render(<Main />);

    // ✅ check for logo instead of CSS animation
    expect(screen.getByAltText('header logo')).toBeInTheDocument();
  });

  it('renders Cloudinary image first', async () => {
    await renderWithMedia();

    const image = await screen.findByAltText('Hero Image');

    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('src', mockMedia[0].src);
  });

  it('renders Cloudinary video after slide change', async () => {
    await renderWithMedia();

    const buttons = screen.getAllByRole('button');
    const nextBtn = buttons[1];

    await act(async () => {
      fireEvent.click(nextBtn);
      await new Promise(r => setTimeout(r, 600));
    });

    const video = screen.getByTestId('intro-video');

    expect(video).toBeInTheDocument();
    expect(video.tagName).toBe('VIDEO');
    expect(video).toHaveAttribute('src', mockMedia[1].src);
  });

  it('navigates using arrows', async () => {
    await renderWithMedia();

    const [prevBtn, nextBtn] = screen.getAllByRole('button');

    // Go to video
    await act(async () => {
      fireEvent.click(nextBtn);
      await new Promise(r => setTimeout(r, 600));
    });

    expect(screen.getByTestId('intro-video')).toBeInTheDocument();

    // Go back to image
    await act(async () => {
      fireEvent.click(prevBtn);
      await new Promise(r => setTimeout(r, 600));
    });

    expect(screen.getByAltText('Hero Image')).toBeInTheDocument();
  });
});