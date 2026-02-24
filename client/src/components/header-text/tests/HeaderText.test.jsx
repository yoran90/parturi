import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderText from '../HeaderText';
import useInformation from '../../../hooks/useInformation';

// Mock the hook
vi.mock('../../../hooks/useInformation', () => ({
  default: vi.fn(),
}));

describe('HeaderText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when getInformation is null', () => {
    useInformation.mockReturnValue({ getInformation: null });
    const { container } = render(<HeaderText />);
    expect(container.firstChild).toBeNull();
  });

  it('renders header text when getInformation is available', () => {
    useInformation.mockReturnValue({
      getInformation: { headerText: '<p>Hello World</p>' },
    });

    const { container } = render(<HeaderText />);

    // The container div
    const div = container.firstChild;
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass(
      'bg-black',
      'border',
      'border-slate-600',
      'p-3',
      'text-white',
      'text-center'
    );

    // Check that the inner HTML is rendered
    expect(div.innerHTML).toContain('Hello World');
  });
});