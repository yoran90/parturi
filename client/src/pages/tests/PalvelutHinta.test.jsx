import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import PalvelutHinta from '../PalvelutHinta'
import axios from 'axios'

// --------------------
// MOCK AXIOS
// --------------------
vi.mock('axios')

// --------------------
// MOCK COMPONENTS
// --------------------
vi.mock('../../components/up-header/Information', () => ({
  default: () => <div data-testid="information">Information</div>,
}))

vi.mock('../../components/header/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('../../components/map/Map', () => ({
  default: () => <div data-testid="map">Map</div>,
}))

vi.mock('../../components/footer/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}))

vi.mock('../../components/holy-day/HolyDay', () => ({
  default: () => <div data-testid="holyday">HolyDay</div>,
}))

// --------------------
// MOCK HOOK
// --------------------
vi.mock('../../hooks/useTitleForPage', () => ({
  default: () => ({
    getTitleForPage: {
      titleForPage: {
        serviceTitle: 'Palvelut ja hinnat',
        serviceDescription: '<p>Test service description</p>',
      },
    },
  }),
}))

// --------------------
// MOCK DATA
// --------------------
const mockPrices = [
  {
    title: 'Basic Service',
    service: '<p>Basic service description</p>',
  },
  {
    title: 'Premium Service',
    service: '<p>Premium service description</p>',
  },
]

const mockMediaResponse = {
  data: {
    data: [
      { type: 'image', src: 'image.jpg' },
      { type: 'video', src: 'video.mp4' },
    ],
  },
}

// --------------------
// TESTS
// --------------------
describe('PalvelutHinta page', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    axios.get.mockImplementation((url) => {
      if (url.includes('/media/list')) {
        return Promise.resolve(mockMediaResponse)
      }

      if (url.includes('/price/getprices')) {
        return Promise.resolve({ data: mockPrices })
      }
    })
  })

  it('shows loading state initially', async () => {
    render(<PalvelutHinta />)

    expect(screen.getByText('Ladataan hinta...')).toBeInTheDocument()
  })

  it('renders page title and description after loading', async () => {
    render(<PalvelutHinta />)

    await waitFor(() => {
      expect(screen.getByText('Palvelut ja hinnat')).toBeInTheDocument()
    })

    expect(screen.getByText('Test service description')).toBeInTheDocument()
  })

  it('renders price sections', async () => {
    render(<PalvelutHinta />)

    await waitFor(() => {
      expect(screen.getByText('Basic Service')).toBeInTheDocument()
      expect(screen.getByText('Premium Service')).toBeInTheDocument()
    })

    expect(screen.getByText('Basic service description')).toBeInTheDocument()
    expect(screen.getByText('Premium service description')).toBeInTheDocument()
  })

  it('renders video when media is available', async () => {
    render(<PalvelutHinta />)

    await waitFor(() => {
      const video = document.querySelector('video')
      expect(video).toBeInTheDocument()
      expect(video).toHaveAttribute('src', 'video.mp4')
    })
  })


  it('renders layout components', async () => {
    render(<PalvelutHinta />)

    await waitFor(() => {
      expect(screen.getByTestId('information')).toBeInTheDocument()
      expect(screen.getByTestId('holyday')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('map')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })
})
