import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ResetPassword from '../ResetPassword'
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

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      token: 'test-reset-token',
    }),
  }
})

vi.mock('../../loading/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}))

// --------------------
// Helper
// --------------------
const renderComponent = () =>
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  )

// --------------------
// Tests
// --------------------
describe('ResetPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders reset password form', () => {
    renderComponent()

    expect(
      screen.getByRole('heading', { name: /Salasanan vaihto/i })
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/Kirjoita uusi salasana/i)
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/Kirjoita vahvistu salasana/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /salasanan vaihto/i })
    ).toBeInTheDocument()
  })


  it('shows error if fields are empty', async () => {
    renderComponent()

    fireEvent.click(
      screen.getByRole('button', { name: /salasanan vaihto/i })
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Täytä kaikki kentät')
    })

    expect(axios.post).not.toHaveBeenCalled()
  })

  it('shows error if passwords do not match', async () => {
    renderComponent()

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita uusi salasana/i),
      { target: { value: 'password123' } }
    )

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita vahvistu salasana/i),
      { target: { value: 'password456' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /salasanan vaihto/i })
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Salasanat eivät täsmää')
    })

    expect(axios.post).not.toHaveBeenCalled()
  })

  it('submits form successfully and shows success toast', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        message: 'Salasana vaihdettu onnistuneesti',
      },
    })

    renderComponent()

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita uusi salasana/i),
      { target: { value: 'password123' } }
    )

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita vahvistu salasana/i),
      { target: { value: 'password123' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /salasanan vaihto/i })
    )

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://parturi-backend.onrender.com/api/user/reset-password/test-reset-token',
        {
          password: 'password123',
          confirmPassword: 'password123',
        }
      )
    })

    expect(toast.success).toHaveBeenCalledWith(
      'Salasana vaihdettu onnistuneesti'
    )

    expect(
      screen.getByPlaceholderText(/Kirjoita uusi salasana/i).value
    ).toBe('')
    expect(
      screen.getByPlaceholderText(/Kirjoita vahvistu salasana/i).value
    ).toBe('')
  })

  it('shows error toast when API fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Virheellinen token',
        },
      },
    })

    renderComponent()

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita uusi salasana/i),
      { target: { value: 'password123' } }
    )

    fireEvent.change(
      screen.getByPlaceholderText(/Kirjoita vahvistu salasana/i),
      { target: { value: 'password123' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /salasanan vaihto/i })
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Virheellinen token')
    })
  })

  it('contains link back to forgot password page', () => {
    renderComponent()

    const link = screen.getByText(/Takaisin kirjautumissivulle/i)
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/forgot-password')
  })
})
