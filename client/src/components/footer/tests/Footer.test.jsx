import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );


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
    renderFooter();
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
    const logos = screen.getAllByRole('img', { hidden: true }).filter(el => el.tagName === 'IMG');
    logos.forEach((img) => {
      expect(img).toHaveAttribute('src', 'logo.png');
      expect(img).toHaveAttribute('alt', 'Site Logo');
    });
  });





  it('renders footer bottom text in all variants', () => {
    const bottomTexts = screen.getAllByText(/Footer bottom text/i);
    expect(bottomTexts).toHaveLength(2); // desktop + mobile
    bottomTexts.forEach(el => {
      expect(el).toBeInTheDocument();
    });
  });

});
