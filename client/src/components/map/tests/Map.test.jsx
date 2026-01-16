// src/components/map/tests/Map.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Reset mocks after each test
afterEach(() => {
  vi.resetAllMocks();
});

// Mock the hook
vi.mock('../../../hooks/useInformation');

import Map from '../Map';
import useInformation from '../../../hooks/useInformation';

describe('Map component', () => {
  it('renders an iframe with the correct src when getInformation exists', () => {
    // Mock the hook to return a valid address URL
    useInformation.mockReturnValue({
      getInformation: { addressUrlForMap: 'https://maps.google.com/?q=New+York' },
    });

    render(<Map />);

    const iframe = screen.getByTitle('Google Map');

    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://maps.google.com/?q=New+York');
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('does not render the iframe if getInformation is undefined', () => {
    // Mock the hook to return null
    useInformation.mockReturnValue({ getInformation: null });

    render(<Map />);

    const iframe = screen.queryByTitle('Google Map');
    expect(iframe).not.toBeInTheDocument();
  });
});
