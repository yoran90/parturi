import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from '../UserProfile';

// --------------------
// Mocks
// --------------------
const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }),
}));

vi.mock('../../store/user-auth', () => ({
  getProfileUserById: vi.fn((id) => ({
    type: 'GET_PROFILE',
    payload: id,
  })),
}));

// Mock child components (we don't test them here)
vi.mock('../../components/up-header/Information', () => ({
  default: () => <div data-testid="information" />,
}));

vi.mock('../../components/holy-day/HolyDay', () => ({
  default: () => <div data-testid="holyday" />,
}));

vi.mock('../../components/header/Header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('../../components/footer/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

// --------------------
// Test Data
// --------------------
const mockUserProfile = {
  favoriteName: 'Johnny',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'men',
  email: 'john@example.com',
  phoneNumber: '123456789',
  addressOne: 'Main Street 1',
  addressTwo: 'Apartment 2',
  postalCode: '00100',
  timezone: 'Helsinki',
  country: 'Finland',
  bio: 'This is my bio',
  profileImage: {
    url: 'https://example.com/profile.jpg',
  },
};

import { useSelector } from 'react-redux';

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((callback) =>
      callback({
        userAuth: {
          userProfile: mockUserProfile,
          loading: false,
        },
      })
    );
  });

  it('dispatches getProfileUserById on mount', () => {
    render(<UserProfile />);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'GET_PROFILE',
      payload: '123',
    });
  });

  it('renders user profile information correctly', () => {
    render(<UserProfile />);

    expect(screen.getByText('Johnny')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('men')).toBeInTheDocument();

    const phoneNumbers = screen.getAllByText('123456789');
    expect(phoneNumbers).toHaveLength(2);

    expect(screen.getByText('Main Street 1')).toBeInTheDocument();
    expect(screen.getByText('00100')).toBeInTheDocument();
    expect(screen.getByText('Helsinki')).toBeInTheDocument();
    expect(screen.getByText('Finland')).toBeInTheDocument();
    expect(screen.getByText('Apartment 2')).toBeInTheDocument();
    expect(screen.getByText('This is my bio')).toBeInTheDocument();
  });

  it('renders fallback text when favoriteName is missing', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        userAuth: {
          userProfile: { ...mockUserProfile, favoriteName: null },
          loading: false,
        },
      })
    );

    render(<UserProfile />);

    expect(screen.getByText('Ei lempinimi')).toBeInTheDocument();
  });

  it('renders layout components', () => {
    render(<UserProfile />);

    expect(screen.getByTestId('information')).toBeInTheDocument();
    expect(screen.getByTestId('holyday')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
