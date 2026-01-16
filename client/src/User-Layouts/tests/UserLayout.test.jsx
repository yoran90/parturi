import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserLayout from '../UserLayout'; // Adjust the import path as necessary

// Mocking Outlet component from react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet Content</div>,
  };
});

describe('UserLayout', () => {
  test('renders UserLayout with mocked Outlet content', () => {
    render(
      <BrowserRouter>
        <UserLayout />
      </BrowserRouter>
    );

    // Check if the mocked Outlet content is displayed
    expect(screen.getByText('Mocked Outlet Content')).toBeInTheDocument();
  });
});
