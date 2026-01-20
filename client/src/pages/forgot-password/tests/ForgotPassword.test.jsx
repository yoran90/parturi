import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ForgotPassword from '../ForgotPassword'
import axios from 'axios'
import { toast } from 'react-toastify'

// --------------------
// Mocks
// --------------------
vi.mock('axios')

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('../../../loading/Loading', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}))

// --------------------
// Helper render
// --------------------
const renderComponent = () =>
  render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  )

// --------------------
// Tests
// --------------------
describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders page content correctly', () => {
    renderComponent()

    expect(screen.getByText(/Unohtunut salasana/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Kirjoita sähköpostiosoitteesi/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Lähetä nollauslinkki/i })
    ).toBeInTheDocument()
  })

  it('shows error toast if email is empty', async () => {
    renderComponent()

    fireEvent.click(
      screen.getByRole('button', { name: /Lähetä nollauslinkki/i })
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please enter your email')
    })

    expect(axios.post).not.toHaveBeenCalled()
  })

  it('submits form successfully and shows success toast', async () => {
    axios.post.mockResolvedValueOnce({
      message: 'Password reset link sent',
    })

    renderComponent()

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita sähköpostiosoitteesi/i),
      {
        target: { value: 'test@example.com' },
      }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Lähetä nollauslinkki/i })
    )

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8001/api/user/forgetPassword',
        { email: 'test@example.com' }
      )
    })

    expect(toast.success).toHaveBeenCalled()

    expect(
      screen.getByPlaceholderText(/Kirjoita sähköpostiosoitteesi/i).value
    ).toBe('')
  })


  it('shows error toast when API call fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'User not found',
        },
      },
    })

    renderComponent()

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita sähköpostiosoitteesi/i),
      {
        target: { value: 'wrong@example.com' },
      }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Lähetä nollauslinkki/i })
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('User not found')
    })
  })

  it('contains link back to login page', () => {
    renderComponent()

    const link = screen.getByText(/Takaisin kirjautumissivulle/i)
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/kirjaudu')
  })
})
