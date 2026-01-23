import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Etusivut from '../Etusivut';

// Mock hooks
vi.mock('../../hooks/useInformation', () => ({
  default: vi.fn(),
}));

vi.mock('../../hooks/useTitleForPage', () => ({
  default: vi.fn(),
}));

// Mock components
vi.mock('../../components/main/Main', () => ({
  default: () => <div data-testid="main-component">Main Component</div>,
}));

vi.mock('../../components/map/Map', () => ({
  default: () => <div data-testid="map-component">Map Component</div>,
}));

vi.mock('../../components/footer/Footer', () => ({
  default: () => <div data-testid="footer-component">Footer Component</div>,
}));

vi.mock('../../components/up-header/Information', () => ({
  default: () => <div data-testid="information-component">Information Component</div>,
}));

vi.mock('../../components/header/Header', () => ({
  default: () => <div data-testid="header-component">Header Component</div>,
}));

vi.mock('../../components/holy-day/HolyDay', () => ({
  default: () => <div data-testid="holyday-component">HolyDay Component</div>,
}));

vi.mock('../GallaryLimit', () => ({
  default: () => <div data-testid="gallary-limit-component">GallaryLimit Component</div>,
}));

vi.mock('../ProductLimit', () => ({
  default: () => <div data-testid="product-limit-component">ProductLimit Component</div>,
}));

vi.mock('../opinion/ReviewForHome', () => ({
  default: () => <div data-testid="review-component">ReviewForHome Component</div>,
}));

// Import hooks after mocking
import useInformation from '../../hooks/useInformation';
import useTitleForPage from '../../hooks/useTitleForPage';

const mockInformationData = {
  address: '123 Main Street, Helsinki',
  addressUrl: 'https://maps.google.com',
  phone: '+358123456789',
  socialMedia: [
    { platform: 'facebook', url: 'https://facebook.com/parturi' },
    { platform: 'instagram', url: 'https://instagram.com/parturi' },
  ],
};

const mockTitleData = {
  titleForPage: {
    productTitle: 'Tuotteet',
    productDescription: 'Katso meidän tuotevalikoimaa',
    galleriTitle: 'Galleria',
    galleriDescription: 'Näytöt aiemmista töistä',
  },
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Etusivut Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state when loading is true', () => {
    useInformation.mockReturnValue({
      getInformation: null,
      loading: true,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Ladataan odota...')).toBeInTheDocument();
    // Check for loader div with animation
    const loaderDiv = document.querySelector('.loader');
    expect(loaderDiv).toBeInTheDocument();
  });

  it('should render all main components when data is loaded', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByTestId('information-component')).toBeInTheDocument();
    expect(screen.getByTestId('holyday-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('main-component')).toBeInTheDocument();
    expect(screen.getByTestId('map-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('should display business address when available', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('123 Main Street, Helsinki')).toBeInTheDocument();
    expect(screen.getByText('OSOITE')).toBeInTheDocument();
  });

  it('should display phone number when available', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('+358123456789')).toBeInTheDocument();
    expect(screen.getByText('PUHELIN')).toBeInTheDocument();
  });

  it('should display default message when address is not available', () => {
    useInformation.mockReturnValue({
      getInformation: { phone: '+358123456789', socialMedia: [] },
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Ei vielä osoitetta')).toBeInTheDocument();
  });

  it('should display default message when phone is not available', () => {
    useInformation.mockReturnValue({
      getInformation: { address: '123 Main Street', socialMedia: [] },
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Ei vielä puhelinnumeroa')).toBeInTheDocument();
  });

  it('should render social media links when available', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Seuraa Meitä')).toBeInTheDocument();
  });

  it('should display default message when social media is not available', () => {
    useInformation.mockReturnValue({
      getInformation: { address: '123 Main Street', phone: '+358123456789' },
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Ei vielä sosiaalialueita')).toBeInTheDocument();
  });

  it('should render welcome section text', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('TERVETULOA')).toBeInTheDocument();
    expect(screen.getByText(/Tervetuloa Parturiin/)).toBeInTheDocument();
  });

  it('should render services section with title', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Parturipalvelut')).toBeInTheDocument();
  });

  it('should render why choose us section', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('💈Miksi Valita Meidät')).toBeInTheDocument();
    expect(screen.getByText('Ammattilainen')).toBeInTheDocument();
    expect(screen.getByText('Mestari / huippuosaaja')).toBeInTheDocument();
    expect(screen.getByText('Luotettu / asiakkaiden suosima')).toBeInTheDocument();
  });

  it('should render ProductLimit component', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByTestId('product-limit-component')).toBeInTheDocument();
  });

  it('should render GallaryLimit component', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByTestId('gallary-limit-component')).toBeInTheDocument();
  });

  it('should render ReviewForHome component', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByTestId('review-component')).toBeInTheDocument();
  });

  it('should render reviews section title', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Arvostelut')).toBeInTheDocument();
  });

  it('should render navigation links to product page', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    const productLink = screen.getByRole('link', { name: /Katso kaikki tuotteet/i });
    expect(productLink).toBeInTheDocument();
    expect(productLink).toHaveAttribute('href', '/tuotet');
  });

  it('should render navigation links to gallery page', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    const galleryLink = screen.getByRole('link', { name: /Katso kaikki kuvat/i });
    expect(galleryLink).toBeInTheDocument();
    expect(galleryLink).toHaveAttribute('href', '/galleria');
  });

  it('should render navigation link to reviews page', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    const reviewLink = screen.getByRole('link', { name: /Katso kaikki arvostelut/i });
    expect(reviewLink).toBeInTheDocument();
    expect(reviewLink).toHaveAttribute('href', '/opinion');
  });

  it('should display product title from getTitleForPage', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Tuotteet')).toBeInTheDocument();
  });

  it('should display gallery title from getTitleForPage', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('Galleria')).toBeInTheDocument();
  });

  it('should handle missing getTitleForPage data gracefully', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: null,
    });

    // Should not throw error
    expect(() => {
      renderWithRouter(<Etusivut />);
    }).not.toThrow();
  });

  it('should render the welcome image in the welcome section', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    // Check for images using querySelector since some images might not have alt text
    const images = document.querySelectorAll('img');
    // Check that there are images (barber image and service icons)
    expect(images.length).toBeGreaterThan(0);
  });

  it('should display all required section headings', () => {
    useInformation.mockReturnValue({
      getInformation: mockInformationData,
      loading: false,
    });

    useTitleForPage.mockReturnValue({
      getTitleForPage: mockTitleData,
    });

    renderWithRouter(<Etusivut />);

    expect(screen.getByText('TERVETULOA')).toBeInTheDocument();
    expect(screen.getByText('Parturipalvelut')).toBeInTheDocument();
    expect(screen.getByText('💈Miksi Valita Meidät')).toBeInTheDocument();
    expect(screen.getByText('Arvostelut')).toBeInTheDocument();
  });
});
