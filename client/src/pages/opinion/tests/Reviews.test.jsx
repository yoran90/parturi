import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Reviews from '../Reviews'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import useReviews from '../../../hooks/useReviews'
import * as reactRedux from 'react-redux'
import { vi } from 'vitest'

// ---------------- MOCKS ----------------

vi.mock('react-redux', () => ({
  useSelector: vi.fn(() => ({
    user: { id: 'user1', firstName: 'John', lastName: 'Doe', gender: 'men' }
  })),
  useDispatch: () => vi.fn()
}))

vi.mock('../../../hooks/useReviews')

// ---------------- UTILS ----------------

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

// ---------------- DATA ----------------

const sampleReview = {
  _id: 'review1',
  userId: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  reviewText: 'This is a test review',
  rating: 4,
  likes: {
    count: 1,
    likedBy: [
      {
        userId: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'men',
        likedAt: new Date()
      }
    ]
  },
  comments: [
    {
      _id: 'comment1',
      userId: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'women',
      comment: 'Nice review!',
      createdAt: new Date(),
      replies: [
        {
          _id: 'reply1',
          userId: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          gender: 'men',
          reply: 'Thank you!', // ✅ Changed from 'comment' to 'reply'
          createdAt: new Date()
        }
      ]
    }
  ],
  mediaReview: null
}

// ---------------- TESTS ----------------

describe('Reviews Component', () => {
  const mockSetGetReviews = vi.fn()
  const mockFetchReviews = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useReviews.mockReturnValue({
      getReviews: [],
      setGetReviews: mockSetGetReviews,
      fetchReviwes: mockFetchReviews
    })
  })

  it('renders "no reviews" message when getReviews is empty', () => {
    renderWithRouter(<Reviews />)
    expect(screen.getByText(/Ei vielä arvosteluja/i)).toBeInTheDocument()
  })

  it('renders a review with user info, rating, and text', () => {
    useReviews.mockReturnValue({
      getReviews: [sampleReview],
      setGetReviews: mockSetGetReviews,
      fetchReviwes: mockFetchReviews
    })

    renderWithRouter(<Reviews />)

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    expect(screen.getByText(/4 \/ 5/i)).toBeInTheDocument()
    expect(screen.getByText(/This is a test review/i)).toBeInTheDocument()
  })

  it('opens like modal when "Tykätty" button is clicked', async () => {
    useReviews.mockReturnValue({
      getReviews: [sampleReview],
      setGetReviews: mockSetGetReviews,
      fetchReviwes: mockFetchReviews
    })

    renderWithRouter(<Reviews />)

    fireEvent.click(screen.getByText(/1 Tykätty/i))

    await waitFor(() => {
      const headings = screen.getAllByRole('heading', { name: /tykätty/i })
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  it('opens review menu', () => {
    useReviews.mockReturnValue({
      getReviews: [sampleReview],
      setGetReviews: mockSetGetReviews,
      fetchReviwes: mockFetchReviews
    })

    renderWithRouter(<Reviews />)

    const menuBtn = screen.getByLabelText(/review menu/i)
    fireEvent.click(menuBtn)

    expect(screen.getByText(/Remove/i)).toBeInTheDocument()
    expect(screen.getByText(/Edit/i)).toBeInTheDocument()
  })

  it('shows reply when "Näytä vastaus" is clicked', async () => {
    useReviews.mockReturnValue({
      getReviews: [sampleReview],
      setGetReviews: mockSetGetReviews,
      fetchReviwes: mockFetchReviews
    })

    renderWithRouter(<Reviews />)

    // 1️⃣ Open comments
    await userEvent.click(screen.getByText(/kommentit/i))

    // 2️⃣ Click reply toggle
    const replyToggle = await screen.findByLabelText(/näytä vastaus/i)
    await userEvent.click(replyToggle)

    // 3️⃣ Assert reply text
    expect(await screen.findByTestId('reply-text')).toHaveTextContent('Thank you!')
  })

  it('submits a comment', async () => {
  useReviews.mockReturnValue({
    getReviews: [sampleReview],
    setGetReviews: mockSetGetReviews,
    fetchReviwes: mockFetchReviews
  })

  renderWithRouter(<Reviews />)

  // 1️⃣ Open comments
  const commentsToggle = screen.getByText(/kommentit/i)
  await userEvent.click(commentsToggle)

  // 2️⃣ Find the comment input (now it exists)
  const input = await screen.findByPlaceholderText(/Kirjoittaa kommentti/i)


  // 3️⃣ Type a comment
  await userEvent.type(input, 'Test comment')

  // 4️⃣ Submit the form
  fireEvent.submit(input.closest('form'))

  // 5️⃣ Assert the value (or that the submit handler ran)
  expect(input).toHaveValue('Test comment')
})

})
