// src/admin/tests/layouts/AdminLayout.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../AdminLayout';

describe('AdminLayout Component', () => {
  it('renders the Outlet correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" element={<div>Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Check that the child route (Outlet) renders
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
