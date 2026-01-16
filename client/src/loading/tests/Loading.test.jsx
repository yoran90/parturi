import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../Loading';

test('renders Loading spinner', () => {
  render(
    <Loading
      width={50}
      height={50}
      border="4px"
      topBorder="4px"
      borderColor="gray"
      borderTopColor="red"
    />
  );

  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeInTheDocument();

  // Check key styles individually
  expect(spinner).toHaveStyle('width: 50px');
  expect(spinner).toHaveStyle('height: 50px');
  expect(spinner).toHaveStyle('border-radius: 50%');
  expect(spinner).toHaveStyle('border-top-color: rgb(255, 0, 0)');
  expect(spinner).toHaveStyle('animation: spin 1s linear infinite');
});
