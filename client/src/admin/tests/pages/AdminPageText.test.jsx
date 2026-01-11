import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminPageText from '../../pages/AdminPageText';

describe('AdminPageText Component', () => {
  test('renders all main texts correctly', () => {
    render(<AdminPageText />);

    expect(screen.getByText(/welcome to admin pannel/i)).toBeInTheDocument();
 
    expect(screen.getByText(/please select an option from the sidebar/i)).toBeInTheDocument();

    expect(
      screen.getByText(/this admin panel allows you to manage all aspects of your application efficiently/i)
    ).toBeInTheDocument();
  });
});
