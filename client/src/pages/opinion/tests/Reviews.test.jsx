import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, beforeEach, expect } from 'vitest';
import configureStore from 'redux-mock-store';
import Reviews from '../Reviews';

const mockStore = configureStore([]);

describe('Reviews Component', () => {
  let store;
  let mockReviews;

  beforeEach(() => {
    store = mockStore({
      userAuth: {
        user: { id: 'user1', gender: 'men', profileImage: null },
      },
    });

    mockReviews = [
      {
        _id: 'review1',
        userId: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        profileImage: null,
        gender: 'men',
        rating: 4,
        reviewText: 'This is a test review',
        updatedAt: new Date(),
        likes: { count: 1, likedBy: [{ userId: 'user1', firstName: 'John', lastName: 'Doe', likedAt: new Date() }] },
        comments: [
          {
            _id: 'comment1',
            userId: 'user2',
            firstName: 'Jane',
            lastName: 'Smith',
            gender: 'women',
            comment: 'Nice review!',
            createdAt: new Date(),
            replies: [],
          },
        ],
      },
    ];
  });

  it('renders "Ei vielä arvosteluja" if no reviews', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reviews getReviews={[]} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText((content) => content.includes("Ei vielä arvosteluja"))).toBeInTheDocument();
  });

  it('renders a review with stars and user info', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reviews getReviews={mockReviews} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/This is a test review/i)).toBeInTheDocument();
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("4 / 5"))).toBeInTheDocument();  // Flexible match for rating
  });

  it('allows user to open edit/delete menu', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reviews getReviews={mockReviews} />
        </BrowserRouter>
      </Provider>
    );
    // Use test ID or more specific role/label if necessary
    const menuButton = screen.getByTestId('options-button');  // Use data-testid for accuracy
    fireEvent.click(menuButton);
    expect(screen.getByText(/Remove/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  it('toggles like button', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reviews getReviews={mockReviews} />
        </BrowserRouter>
      </Provider>
    );
    const likeButton = screen.getByTestId('like-button');  // Use data-testid for accuracy
    fireEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass('liked')); // Wait for class to be toggled
  });

  it('shows comment section', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reviews getReviews={mockReviews} />
        </BrowserRouter>
      </Provider>
    );
    const commentButton = screen.getByTestId('comment-button');  // Use data-testid for accuracy
    fireEvent.click(commentButton);
    expect(screen.getByText(/Nice review!/i)).toBeInTheDocument();
  });

  it('allows submitting a reply', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reviews getReviews={mockReviews} />
        </BrowserRouter>
      </Provider>
    );
    const replyToggle = screen.getByTestId('reply-toggle');  // Use data-testid for accuracy
    fireEvent.click(replyToggle);
    const input = screen.getByPlaceholderText(/Kirjoittaa kommentti/i);
    fireEvent.change(input, { target: { value: 'Test reply' } });
    fireEvent.submit(input.closest('form'));

    // Verify the reply is submitted (this will depend on your component logic)
    await waitFor(() => expect(screen.getByText(/Test reply/i)).toBeInTheDocument());
  });
});
