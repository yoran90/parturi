import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HolyDay from '../HolyDay';

/* ----------------------------------
   HOIST-SAFE MOCK
---------------------------------- */

let holydayValue = '';

vi.mock('../../../hooks/useInformation', () => ({
  __esModule: true,
  default: () => ({
    getInformation: {
      holyday: holydayValue
    }
  })
}));

/* ----------------------------------
   TESTS
---------------------------------- */

describe('HolyDay Component', () => {
  beforeEach(() => {
    holydayValue = '';
  });

  it('returns null when holyday is empty', () => {
    holydayValue = '';

    const { container } = render(<HolyDay />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when holyday contains only empty quill html', () => {
    holydayValue = '<p><br></p>';

    const { container } = render(<HolyDay />);
    expect(container.firstChild).toBeNull();
  });

  it('renders holyday content when valid html is provided', () => {
    holydayValue = '<p>Closed on public holidays</p>';

    render(<HolyDay />);
    expect(
      screen.getByText('Closed on public holidays')
    ).toBeInTheDocument();
  });

  it('renders raw html correctly using dangerouslySetInnerHTML', () => {
    holydayValue = '<strong>Christmas Day</strong>';

    const { container } = render(<HolyDay />);
    const strong = container.querySelector('strong');

    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent('Christmas Day');
  });

  it('renders the sticky banner container when content exists', () => {
    holydayValue = '<p>Holiday Notice</p>';

    const { container } = render(<HolyDay />);
    const banner = container.querySelector('.holyDaysAnimation');

    expect(banner).toBeInTheDocument();
  });
});
