import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoFoundPage from '../NoFoundPage';

describe('NoFoundPage component', () => {
  test('renders the component correctly', () => {
    render(<NoFoundPage />);

    // Check heading
    const heading = screen.getByRole('heading', { name: /Oops! Something Went Wrong/i });
    expect(heading).toBeInTheDocument();

    // Check main text paragraphs
    expect(screen.getByText(/We’re sorry, but it seems like something went wrong on our end/i)).toBeInTheDocument();
    expect(screen.getByText(/The page may have been moved or deleted/i)).toBeInTheDocument();
    expect(screen.getByText(/There could be an issue with the link you followed/i)).toBeInTheDocument();
    expect(screen.getByText(/There might be a temporary problem with our server/i)).toBeInTheDocument();
    expect(screen.getByText(/But don’t worry! We're on it and working hard/i)).toBeInTheDocument();
    expect(screen.getByText(/We appreciate your patience, and we’re working hard/i)).toBeInTheDocument();

    // Optional: check wrapper div exists
    const wrapper = screen.getByText(/Oops! Something Went Wrong/i).closest('div');
    expect(wrapper).toHaveClass('flex', 'flex-col'); // basic class check
  });
});
