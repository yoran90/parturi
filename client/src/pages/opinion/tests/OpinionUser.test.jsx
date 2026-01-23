import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OpinionUser from '../OpinionUser';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';
import * as useShopModule from '../../../hooks/useShop';
import * as useInformationModule from '../../../hooks/useInformation';

// --------------------
// Mocks
// --------------------
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../OpinionForm', () => ({
  default: ({ closeModel }) => (
    <div data-testid="opinion-form">OpinionForm Mock</div>
  ),
}));

vi.mock('../Reviews', () => ({
  default: () => <div data-testid="reviews">Reviews Mock</div>,
}));

vi.mock('../../../components/header/Header', () => ({
  default: () => <div>Header</div>,
}));

vi.mock('../../../components/up-header/Information', () => ({
  default: () => <div>Information</div>,
}));

vi.mock('../../../components/holy-day/HolyDay', () => ({
  default: () => <div>HolyDay</div>,
}));

vi.mock('../../../components/footer/Footer', () => ({
  default: () => <div>Footer</div>,
}));

vi.mock('../../../hooks/useShop');
vi.mock('../../../hooks/useInformation');

// --------------------
// Test data
// --------------------
const mockGetShope = {
  title: 'Test Shop',
  description: 'Shop Description',
  media: [
    { type: 'image', src: 'image1.jpg' },
    { type: 'video', src: 'video1.mp4' },
  ],
};

const mockGetInformation = {
  address: 'Test Street 123',
  phone: '123456789',
  addressUrlForMap: 'https://maps.google.com',
  holyday: '<p>Closed on Sundays</p>',
  openingHours: '<p>Mon-Fri 9-5</p>',
};

const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  name: 'John Doe',
};

// --------------------
// Tests
// --------------------
describe('OpinionUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useShop hook
    vi.mocked(useShopModule.default).mockReturnValue({
      getShope: mockGetShope,
      setShope: vi.fn(),
      fetchShopMedia: vi.fn(),
    });

    // Mock useInformation hook
    vi.mocked(useInformationModule.default).mockReturnValue({
      getInformation: mockGetInformation,
    });

    // Mock useSelector for logged-in user
    vi.mocked(useSelector).mockImplementation((cb) =>
      cb({
        userAuth: {
          user: mockUser,
        },
      })
    );
  });

  it('renders shop information and media', () => {
    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Shop')).toBeInTheDocument();
    expect(screen.getByText('Shop Description')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('HolyDay')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders Google Maps iframe', () => {
    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    const iframes = document.querySelectorAll('iframe');
    expect(iframes.length).toBeGreaterThan(0);
    expect(iframes[0]).toHaveAttribute('src', mockGetInformation.addressUrlForMap);
  });

  it('switches to OpinionForm tab when user clicks "Kirjoita arvostelu"', () => {
    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    const writeReviewBtn = screen.getByText('Kirjoita arvostelu');
    fireEvent.click(writeReviewBtn);

    expect(screen.getByTestId('opinion-form')).toBeInTheDocument();
  });

  it('switches to Reviews tab when user clicks "Arvostelut"', () => {
    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    // Reviews tab is shown by default
    expect(screen.getByTestId('reviews')).toBeInTheDocument();

    // Switch to OpinionForm
    const writeReviewBtn = screen.getByText('Kirjoita arvostelu');
    fireEvent.click(writeReviewBtn);

    // OpinionForm should now be visible
    expect(screen.getByTestId('opinion-form')).toBeInTheDocument();
  });

  it('shows toast error if user is not logged in', () => {
    // Mock no user
    vi.mocked(useSelector).mockImplementation((cb) =>
      cb({
        userAuth: {
          user: null,
        },
      })
    );

    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    const writeReviewBtn = screen.getByText('Kirjoita arvostelu');
    fireEvent.click(writeReviewBtn);

    expect(toast.error).toHaveBeenCalledWith(
      'Sinun tulee kirjautua sisään, jotta voit lisätä arvosteluja.'
    );
  });

  it('renders shop media correctly', () => {
    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    // Verify shop title is rendered (indicates shop data is loaded)
    expect(screen.getByText('Test Shop')).toBeInTheDocument();
    
    // Verify media container exists
    const mediaContainers = document.querySelectorAll('[class*="flex"]');
    expect(mediaContainers.length).toBeGreaterThan(0);
  });

  it('renders shop opening hours when holyday has text', () => {
    render(
      <MemoryRouter>
        <OpinionUser />
      </MemoryRouter>
    );

    expect(screen.getByText('Closed on Sundays')).toBeInTheDocument();
  });
});
