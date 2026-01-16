import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

/* ---------------- MOCKS ---------------- */

vi.mock('../../../hooks/useHeaderLogo', () => ({
  __esModule: true,
  default: () => ({
    headerLogo: { url: 'logo.png' }
  })
}));

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn()
  };
});

vi.mock('../../../store/user-auth', () => ({
  userLogout: vi.fn(() => ({ type: 'LOGOUT' }))
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn() }
}));

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

/* ---------------- HELPERS ---------------- */

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

afterEach(() => {
  vi.clearAllMocks();
});

/* ---------------- TESTS ---------------- */

describe('Header Component', () => {
  it('shows loader when loading is true', () => {
    useSelector.mockReturnValue({ loading: true });
    renderHeader();
    expect(document.querySelector('.loader')).toBeInTheDocument();
  });

  it('renders logo and navigation links when not authenticated', () => {
  useSelector.mockReturnValue({
    loading: false,
    user: null,
    isAuthenticated: false
  });

  renderHeader();

  expect(screen.getAllByAltText('Header Logo').length).toBeGreaterThan(0);

  expect(screen.getAllByText('Etusivu').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Meistä').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Palvelut').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Kirjaudu').length).toBeGreaterThan(0);
  expect(screen.getAllByText('rekisteröidy').length).toBeGreaterThan(0);
});


  it('renders user avatar when authenticated', () => {
    useSelector.mockReturnValue({
      loading: false,
      isAuthenticated: true,
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'men',
        profileImage: { url: 'profile.png' }
      }
    });

    const { container } = renderHeader();

    const images = container.querySelectorAll('img');
    const avatar = [...images].find(img =>
      img.src.includes('profile.png')
    );

    expect(avatar).toBeTruthy();
  });

  it('opens user menu when avatar is clicked', () => {
  useSelector.mockReturnValue({
    loading: false,
    isAuthenticated: true,
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      gender: 'men'
    }
  });

  const { container } = renderHeader();

  // select DESKTOP avatar (first user avatar inside nav)
  const avatarButtons = container.querySelectorAll(
    'button img[src*="encrypted"]'
  );

  fireEvent.click(avatarButtons[0]);

  expect(screen.getAllByText(/John Doe/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/john@example.com/).length).toBeGreaterThan(0);
  expect(screen.getAllByText('Lougout').length).toBeGreaterThan(0);
});


  it('logs out user when logout button is clicked', () => {
  useSelector.mockReturnValue({
    loading: false,
    isAuthenticated: true,
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      gender: 'men'
    }
  });

  const { container } = renderHeader();

  const avatarButtons = container.querySelectorAll(
    'button img[src*="encrypted"]'
  );

  fireEvent.click(avatarButtons[0]);
  fireEvent.click(screen.getAllByText('Lougout')[0]);

  expect(mockDispatch).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith('/kirjaudu');
  expect(toast.success).toHaveBeenCalledWith(
    'Logged out successfully!'
  );
});


  it('toggles mobile menu icon', () => {
    useSelector.mockReturnValue({
      loading: false,
      user: null,
      isAuthenticated: false
    });

    const { container } = renderHeader();
    const buttons = container.querySelectorAll('svg');

    fireEvent.click(buttons[buttons.length - 1]);
  });
});
