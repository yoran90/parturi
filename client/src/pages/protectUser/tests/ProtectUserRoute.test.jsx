import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectUserRoute from '../ProtectUserRoute';

// Mock protected component
const DummyComponent = () => <div>Protected Content</div>;

describe('ProtectUserRoute', () => {
  it('shows a loading spinner while loading', () => {
    render(
      <MemoryRouter>
        <ProtectUserRoute loading={true} isAuthenticated={false} user={null}>
          <DummyComponent />
        </ProtectUserRoute>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('redirects unauthenticated users to the login page', async () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/user-login/kirjaudu" element={<div>Login Page</div>} />
          <Route
            path="/*"
            element={
              <ProtectUserRoute
                loading={false}
                isAuthenticated={false}
                user={null}
              >
                <DummyComponent />
              </ProtectUserRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });

  it('renders children for authenticated users with user role', () => {
    render(
      <MemoryRouter>
        <ProtectUserRoute
          loading={false}
          isAuthenticated={true}
          user={{ role: 'user' }}
        >
          <DummyComponent />
        </ProtectUserRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects authenticated admin visiting kirjaudu to /login', async () => {
    render(
      <MemoryRouter initialEntries={['/user-login/kirjaudu']}>
        <Routes>
          <Route
            path="/user-login/kirjaudu"
            element={
              <ProtectUserRoute
                loading={false}
                isAuthenticated={true}
                user={{ role: 'admin' }}
              >
                <DummyComponent />
              </ProtectUserRoute>
            }
          />
          <Route path="/login" element={<div>Admin Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Admin Login Page')).toBeInTheDocument();
  });

  it('redirects authenticated super-admin visiting kirjaudu to /login', async () => {
    render(
      <MemoryRouter initialEntries={['/user-login/kirjaudu']}>
        <Routes>
          <Route
            path="/user-login/kirjaudu"
            element={
              <ProtectUserRoute
                loading={false}
                isAuthenticated={true}
                user={{ role: 'super-admin' }}
              >
                <DummyComponent />
              </ProtectUserRoute>
            }
          />
          <Route path="/login" element={<div>Admin Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Admin Login Page')).toBeInTheDocument();
  });

  it('redirects authenticated user visiting kirjaudu to /profile', async () => {
    render(
      <MemoryRouter initialEntries={['/user-login/kirjaudu']}>
        <Routes>
          <Route
            path="/user-login/kirjaudu"
            element={
              <ProtectUserRoute
                loading={false}
                isAuthenticated={true}
                user={{ role: 'user' }}
              >
                <DummyComponent />
              </ProtectUserRoute>
            }
          />
          <Route path="/profile" element={<div>User Profile</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('User Profile')).toBeInTheDocument();
  });

  it('redirects authenticated non-user role to /unauth-page', async () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/unauth-page" element={<div>Unauthorized Page</div>} />
          <Route
            path="/*"
            element={
              <ProtectUserRoute
                loading={false}
                isAuthenticated={true}
                user={{ role: 'guest' }}
              >
                <DummyComponent />
              </ProtectUserRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Unauthorized Page')).toBeInTheDocument();
  });

  it('allows authenticated user role to access protected routes', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <ProtectUserRoute
          loading={false}
          isAuthenticated={true}
          user={{ role: 'user' }}
        >
          <DummyComponent />
        </ProtectUserRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
