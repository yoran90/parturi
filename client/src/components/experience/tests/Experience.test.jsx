import { render, screen } from '@testing-library/react';
import Experience from '../Experience';

test('renders the image', () => {
  render(<Experience />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', expect.stringContaining('vintage-barber-shop'));
});
