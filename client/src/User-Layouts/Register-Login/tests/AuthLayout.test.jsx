import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthLayout from '../AuthLayout'; // Ensure the correct import path

// Mocking react-router-dom with `importOriginal`
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal(); // Import the actual module
  return {
    ...actual, // Spread the original module to retain other functions
    Outlet: () => <div>Mocked Outlet Content</div>, // Mock Outlet to return mocked content
  };
});

describe('AuthLayout', () => {
  test('renders AuthLayout with mocked Outlet content', () => {
    render(
      <BrowserRouter>
        <AuthLayout />
      </BrowserRouter>
    );

    // Check if the mocked content appears in the layout
    expect(screen.getByText('Mocked Outlet Content')).toBeInTheDocument();
  });
});
