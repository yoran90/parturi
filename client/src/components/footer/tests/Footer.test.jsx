// src/components/footer/tests/Footer.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// Mock hooks
vi.mock('../../../hooks/useInformation', () => ({
  __esModule: true,
  default: () => ({
    getInformation: {
      phone: '123-456-7890',
      email: 'test@example.com',
      socialMedia: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' }
      ]
    }
  })
}));

vi.mock('../../../hooks/useTitleForPage', () => ({
  __esModule: true,
  default: () => ({
    getTitleForPage: {
      titleForPage: {
        footerTitle: 'Footer Title',
        footerDescription: '<p>Footer description content</p>',
        footerFooter: 'Footer bottom text'
      }
    }
  })
}));

vi.mock('../../../hooks/useHeaderLogo', () => ({
  __esModule: true,
  default: () => ({
    headerLogo: {
      url: 'logo.png'
    }
  })
}));

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders footer title and description', () => {
    expect(screen.getByText('Footer Title')).toBeInTheDocument();
    expect(screen.getByText('Footer description content')).toBeInTheDocument();
  });

  it('renders contact info', () => {
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    const facebookLink = screen.getByLabelText('facebook');
    const instagramLink = screen.getByLabelText('instagram');

    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
  });

  it('renders images for logo', () => {
    const logos = screen.getAllByRole('img');
    logos.forEach((img) => {
      expect(img).toHaveAttribute('src'); // just check the src exists
    });
  });



  it('renders footer bottom text', () => {
    const { container } = render(<Footer />);
    expect(container).toHaveTextContent('Footer bottom text');
  });
});
