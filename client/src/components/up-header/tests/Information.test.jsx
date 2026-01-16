import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';
import useInformation from '../../../hooks/useInformation';
import Information from '../Information';

afterEach(() => {
  vi.resetAllMocks();
});

vi.mock('../../../hooks/useInformation');

describe('Information component', () => {
  const mockData = {
    openingHours: '<p>Mon-Fri: 9am - 6pm</p>',
    address: '123 Main St',
    addressUrl: 'https://maps.google.com/?q=123+Main+St',
    phone: '123-456-7890',
    socialMedia: [
      { platform: 'facebook', url: 'https://facebook.com/test' },
      { platform: 'instagram', url: 'https://instagram.com/test' },
      { platform: 'tiktok', url: 'https://tiktok.com/test' },
    ],
  };

  it('renders correctly with getInformation data', () => {
    useInformation.mockReturnValue({ getInformation: mockData });

    render(<Information />);

    // Opening hours
    const openingHoursElements = screen.getAllByText(/Mon-Fri: 9am - 6pm/i);
    expect(openingHoursElements.length).toBeGreaterThan(0);

    // Address link
    const addressLinks = screen.getAllByText(/123 Main St/i).map(el => el.closest('a'));
    expect(addressLinks.some(link => link.href === 'https://maps.google.com/?q=123+Main+St')).toBe(true);

    // Phone link
    const phoneLinks = screen.getAllByText(/123-456-7890/i).map(el => el.closest('a'));
    expect(phoneLinks.some(link => link.href === 'tel:123-456-7890')).toBe(true);

    // Social media links
    const socialLinks = screen.getAllByRole('link').map(link => link.href);
    expect(socialLinks).toEqual(
      expect.arrayContaining([
        expect.stringContaining('https://facebook.com/test'),
        expect.stringContaining('https://instagram.com/test'),
        expect.stringContaining('https://tiktok.com/test'),
      ])
    );
  });

  it('renders nothing if getInformation is null', () => {
    useInformation.mockReturnValue({ getInformation: null });

    const { container } = render(<Information />);
    expect(container.firstChild).toBeNull();
  });
});
