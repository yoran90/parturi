import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Yhteystiedot from '../Yhteystiedot'
import { vi, beforeEach } from 'vitest'
import axios from 'axios'
import { toast } from 'react-toastify'

// Hoist mocks to avoid initialization issues
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

// ----------------- MOCKS ------------------

// Mock child components
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
  default: ({ width, height }) => <div data-testid="loading">Loading...</div>,
}))

vi.mock('../SuccessMessage', () => ({
  __esModule: true,
  default: ({ close }) => <div data-testid="success-message" onClick={close}>SuccessMessage</div>,
}))

// Mock hooks
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

// Mock axios
vi.mock('axios')
axios.post = vi.fn(() => Promise.resolve({ data: { success: true } }))

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}))

// ----------------- TESTS ------------------

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
    // override hook to return loading=true
    mockUseInformation.mockReturnValueOnce({
      getInformation: null,
      loading: true,
    })

    render(<Yhteystiedot />)
    expect(screen.getByText(/Ladataan yhteystietoja/i)).toBeInTheDocument()
  })

  it('renders main page content correctly', () => {
    render(<Yhteystiedot />)

    // Test header, footer, information, holyday
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('information')).toBeInTheDocument()
    expect(screen.getByTestId('holyday')).toBeInTheDocument()

    // Test title and description
    expect(screen.getByText('Test Connection Title')).toBeInTheDocument()
    expect(screen.getByText('Test Connection Description')).toBeInTheDocument()

    // Test contact info (address appears multiple times)
    const addressElements = screen.getAllByText('Test Address')
    expect(addressElements.length).toBeGreaterThan(0)
    expect(screen.getByText('+35812345678')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('submits form successfully', async () => {
    render(<Yhteystiedot />)

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText('nimesi'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('+35812345678'), { target: { value: '+35812345678' } })
    fireEvent.change(screen.getByPlaceholderText('example@example.com'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Kirjoita viesti...'), { target: { value: 'Hello!' } })

    const button = screen.getByText('lähetä viesti')
    fireEvent.click(button)

    // Wait for axios.post to be called
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
