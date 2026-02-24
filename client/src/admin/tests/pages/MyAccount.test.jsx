import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MyAccount from '../../pages/MyAccount';
import axios from 'axios';

// --------------------
// MOCKS
// --------------------
vi.mock('axios');

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../store/admin-auth', () => ({
  getUserByIdInAdmin: vi.fn(() => ({ type: 'GET_USER' })),
  setAdmin: vi.fn((payload) => ({ type: 'SET_ADMIN', payload })),
}));

vi.mock('../../../loading/Loading', () => ({
  default: () => <span>loading...</span>,
}));

// --------------------
// MOCK DATA
// --------------------
const mockAdmin = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'admin',
  gender: 'men',
  favoriteName: 'Johnny',
  bio: 'My bio',
  addressOne: 'Address 1',
  addressTwo: 'Address 2',
  country: 'United States',
  city: 'New York',
  postalCode: '10001',
  phoneNumber: '123456789',
  notes: 'Notes',
  timezone: 'UTC',
  profileImage: {
    url: 'https://res.cloudinary.com/demo/image/upload/profile.jpg',
  },
};

// --------------------
// STORE RENDER HELPER
// --------------------
const renderWithStore = (state) => {
  const store = configureStore({
    reducer: {
      adminAuth: (s = state) => s,
    },
  });

  return render(
    <Provider store={store}>
      <MyAccount />
    </Provider>
  );
};

// --------------------
// TESTS
// --------------------
describe('MyAccount Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'fake-token');
  });

  it('shows loader when loading is true', () => {
    renderWithStore({ admin: null, loading: true });

    expect(document.querySelector('.loader')).toBeInTheDocument();
  });

  it('renders admin profile info and Cloudinary image', () => {
    const { container } = renderWithStore({ admin: mockAdmin, loading: false });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();

    // ✅ Cloudinary-safe image check
    const images = container.querySelectorAll('img');
    const profileImage = [...images].find(img =>
      img.src.includes('cloudinary')
    );

    expect(profileImage).toBeTruthy();
  });

  it('updates first name input when typing', () => {
    renderWithStore({ admin: mockAdmin, loading: false });

    // ⚠️ duplicate placeholder fix
    const [firstNameInput] = screen.getAllByPlaceholderText('First name');

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    expect(firstNameInput.value).toBe('Jane');
  });

  it('submits form and calls axios.put', async () => {
    axios.put.mockResolvedValueOnce({
      data: {
        token: 'new-token',
        user: mockAdmin,
      },
    });

    renderWithStore({ admin: mockAdmin, loading: false });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });

    expect(axios.put).toHaveBeenCalledWith(
      'https://parturi-backend.onrender.com/api/auth/updateUser',
      expect.any(FormData),
      { withCredentials: true }
    );
  });

  it('shows loading state while saving', async () => {
    let resolvePromise;

    axios.put.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    renderWithStore({ admin: mockAdmin, loading: false });

    fireEvent.click(screen.getByText('Save Changes'));

    // ✅ user-visible loading state
    expect(await screen.findByText('Saving')).toBeInTheDocument();

    resolvePromise({
      data: {
        token: 'token',
        user: mockAdmin,
      },
    });
  });
});
