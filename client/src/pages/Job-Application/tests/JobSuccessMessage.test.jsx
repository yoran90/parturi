// JobSuccessMessage.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import JobSuccessMessage from '../JobSuccessMessage';

describe('JobSuccessMessage Component', () => {
  it('renders the success message correctly', () => {
    // Mock function for the close button
    const mockClose = vi.fn();

    render(<JobSuccessMessage closeSuccessMessage={mockClose} />);

    // Check if the success image is rendered
    const image = screen.getByAltText('Success');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://img.freepik.com/premium-photo/3d-man-with-huge-tick-thumb-up_168450-29.jpg?semt=ais_hybrid&w=740&q=80');

    // Check if the headings and paragraphs are rendered
    expect(screen.getByText('Hakemuksesi on lähetetty onnistuneesti!')).toBeInTheDocument();
    expect(screen.getByText('Työhakemuksesi on vastaanotettu. Saatamme olla sinuun yhteydessä mahdollisimman pian.')).toBeInTheDocument();
    expect(screen.getByText('Kiitos kiinnostuksestasi ja hakemuksestasi!')).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });

  it('calls closeSuccessMessage when the button is clicked', () => {
    const mockClose = vi.fn();
    render(<JobSuccessMessage closeSuccessMessage={mockClose} />);

    const button = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(button);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
