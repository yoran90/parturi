import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Yhteystiedot from '../Yhteystiedot'
import { vi, beforeEach, describe, it, expect } from 'vitest'
import axios from 'axios'

// ---------------- HOISTED MOCK ----------------
const { mockUseInformation } = vi.hoisted(() => ({
  mockUseInformation: vi.fn(() => ({
    getInformation: {
      address: 'Test Address',
      phone: '+35812345678',
      email: 'test@example.com',
      socialMedia: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
      ],
      addressUrlForMap: 'https://maps.google.com',
    },
    loading: false,
  })),
}))

// ---------------- COMPONENT MOCKS ----------------

vi.mock('../../components/footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}))

vi.mock('../../components/header/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('../../components/up-header/Information', () => ({
  __esModule: true,
  default: () => <div data-testid="information">Information</div>,
}))

vi.mock('../../components/holy-day/HolyDay', () => ({
  __esModule: true,
  default: () => <div data-testid="holyday">HolyDay</div>,
}))

vi.mock('../../loading/Loading', () => ({
  __esModule: true,
  default: () => <div data-testid="loading">Loading...</div>,
}))

vi.mock('../SuccessMessage', () => ({
  __esModule: true,
  default: ({ close }) => (
    <div data-testid="success-message" onClick={close}>
      SuccessMessage
    </div>
  ),
}))

// ✅ JobApplication mock
vi.mock('../Job-Application/JobApplication', () => ({
  __esModule: true,
  default: ({ close }) => (
    <div data-testid="job-application">
      <p>Job Application Modal</p>
      <button onClick={close}>Close</button>
    </div>
  ),
}))

// ---------------- HOOK MOCKS ----------------

vi.mock('../../hooks/useInformation', () => ({
  __esModule: true,
  default: mockUseInformation,
}))

vi.mock('../../hooks/useTitleForPage', () => ({
  __esModule: true,
  default: () => ({
    getTitleForPage: {
      titleForPage: {
        connectionTitle: 'Test Connection Title',
        connectionDescription: 'Test Connection Description',
      },
    },
  }),
}))

// ---------------- LIBRARY MOCKS ----------------

vi.mock('axios')
axios.post = vi.fn(() => Promise.resolve({ data: { success: true } }))

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}))

// ---------------- TESTS ----------------

describe('Yhteystiedot page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseInformation.mockReturnValue({
      getInformation: {
        address: 'Test Address',
        phone: '+35812345678',
        email: 'test@example.com',
        socialMedia: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
        ],
        addressUrlForMap: 'https://maps.google.com',
      },
      loading: false,
    })
  })

  it('renders loading state correctly', () => {
    mockUseInformation.mockReturnValueOnce({
      getInformation: null,
      loading: true,
    })

    render(<Yhteystiedot />)
    expect(
      screen.getByText(/Ladataan yhteystietoja/i)
    ).toBeInTheDocument()
  })

  it('renders main page content correctly', () => {
    render(<Yhteystiedot />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('information')).toBeInTheDocument()
    expect(screen.getByTestId('holyday')).toBeInTheDocument()

    expect(
      screen.getByText('Test Connection Title')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Test Connection Description')
    ).toBeInTheDocument()

    const addressElements = screen.getAllByText('Test Address')
    expect(addressElements.length).toBeGreaterThan(0)

    expect(screen.getByText('+35812345678')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('does not show job application modal initially', () => {
    render(<Yhteystiedot />)

    expect(
      screen.queryByTestId('job-application')
    ).not.toBeInTheDocument()
  })

  it('opens job application modal when clicking "Meille töihin"', () => {
    render(<Yhteystiedot />)

    fireEvent.click(screen.getByText('Meille töihin'))

    expect(
      screen.getByTestId('job-application')
    ).toBeInTheDocument()
  })

  it('closes job application modal when close button is clicked', () => {
    render(<Yhteystiedot />)

    fireEvent.click(screen.getByText('Meille töihin'))
    fireEvent.click(screen.getByText('Close'))

    expect(
      screen.queryByTestId('job-application')
    ).not.toBeInTheDocument()
  })

  it('submits form successfully', () => {
    render(<Yhteystiedot />)

    fireEvent.change(screen.getByPlaceholderText('nimesi'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('+35812345678'), {
      target: { value: '+35812345678' },
    })
    fireEvent.change(screen.getByPlaceholderText('example@example.com'), {
      target: { value: 'test@test.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Kirjoita viesti...'), {
      target: { value: 'Hello!' },
    })

    fireEvent.click(screen.getByText('lähetä viesti'))

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8001/api/email/send-email',
      {
        name: 'John Doe',
        phone: '+35812345678',
        email: 'test@test.com',
        message: 'Hello!',
      }
    )
  })
})
