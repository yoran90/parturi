import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyAccount from '../../pages/MyAccount';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { toast } from 'react-toastify';

vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockStore = configureStore([]);

describe('MyAccount Component', () => {
  let store;

  const mockAdmin = {
    id: '1',
    favoriteName: 'Fav',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'men',
    email: 'john@example.com',
    bio: 'Hello!',
    addressOne: '123 St',
    addressTwo: 'Apt 4',
    country: 'United States',
    city: 'NY',
    postalCode: '10001',
    phoneNumber: '+1234567890',
    notes: 'Some notes',
    timezone: 'EST',
    role: 'Admin',
    profileImage: { url: 'profile.png' },
  };

  beforeEach(() => {
    store = mockStore({
      adminAuth: {
        admin: mockAdmin,
        loading: false,
      },
    });
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MyAccount />
      </Provider>
    );

  it('renders initial admin info', () => {
    renderComponent();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Fav')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hello!')).toBeInTheDocument();
    expect(screen.getByDisplayValue('United States')).toBeInTheDocument();
  });

  it('shows loading state when loading is true', () => {
    store = mockStore({
      adminAuth: {
        admin: null,
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <MyAccount />
      </Provider>
    );

    expect(screen.getByText(/loader/i)).toBeInTheDocument();
  });

  it('updates form fields and submits', async () => {
    axios.put.mockResolvedValue({
      data: {
        token: 'newToken',
        user: { ...mockAdmin, favoriteName: 'Updated' },
      },
    });

    renderComponent();

    // Change favorite name
    const favInput = screen.getByPlaceholderText(/Enter your favorite name/i);
    fireEvent.change(favInput, { target: { value: 'Updated' } });

    // Change bio
    const bioInput = screen.getByDisplayValue('Hello!');
    fireEvent.change(bioInput, { target: { value: 'Updated Bio' } });

    // Submit form
    const submitButton = screen.getByText(/Save Changes/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
      expect(localStorage.getItem('token')).toBe('newToken');
      expect(toast.success).toHaveBeenCalledWith('Updated successfully!');
    });
  });

  it('handles profile image change', () => {
    renderComponent();

    const file = new File(['dummy'], 'profile.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/Upload/i).querySelector('input');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByAltText('Profile').src).toContain('blob:');
  });

  it('renders country select with all options', () => {
    renderComponent();

    const select = screen.getByLabelText(/Country/i);
    expect(select).toBeInTheDocument();
    expect(select.options.length).toBeGreaterThan(1); // including "Select Country"
  });

  it('handles gender selection', () => {
    renderComponent();

    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'women' } });
    expect(genderSelect.value).toBe('women');
  });

  it('displays Save Changes button correctly', () => {
    renderComponent();
    const button = screen.getByText(/Save Changes/i);
    expect(button).toBeInTheDocument();
  });
});
