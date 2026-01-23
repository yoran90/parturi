import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import Tuote from '../Tuote'

// --------------------
// MOCK AXIOS
// --------------------
vi.mock('axios')

// --------------------
// MOCK CHILD COMPONENTS
// --------------------
vi.mock('../../components/up-header/Information', () => ({
  default: () => <div data-testid="information" />,
}))

vi.mock('../../components/header/Header', () => ({
  default: () => <div data-testid="header" />,
}))

vi.mock('../../components/map/Map', () => ({
  default: () => <div data-testid="map" />,
}))

vi.mock('../../components/footer/Footer', () => ({
  default: () => <div data-testid="footer" />,
}))

vi.mock('../../components/holy-day/HolyDay', () => ({
  default: () => <div data-testid="holyday" />,
}))

vi.mock('../YksiTuoate', () => ({
  default: ({ title }) => <div data-testid="product-item">{title}</div>,
}))

vi.mock('../../hooks/useTitleForPage', () => ({
  default: () => ({
    getTitleForPage: {
      titleForPage: {
        productTitle: 'Test Products Title',
        productDescription: '<p>Test Products Description</p>',
      },
    },
  }),
}))

// --------------------
// MOCK DATA
// --------------------
const mockProducts = [
  {
    _id: '1',
    title: 'Product 1',
    price: 100,
    discount: 10,
    images: [{ url: 'image1.jpg' }],
    description: '<p>Desc 1</p>',
  },
  {
    _id: '2',
    title: 'Product 2',
    price: 200,
    discount: 0,
    images: [{ url: 'image2.jpg' }],
    description: '<p>Desc 2</p>',
  },
]

// --------------------
// TESTS
// --------------------
describe('Tuote page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading initially', () => {
    axios.get.mockReturnValue(new Promise(() => {})) // never resolves
    render(<Tuote />)
    expect(screen.getByText('Ladataan tuotteita...')).toBeInTheDocument()
  })

  it('renders empty state when no products', async () => {
    axios.get.mockResolvedValue({ data: [] })
    render(<Tuote />)
    await waitFor(() =>
      expect(screen.getByText('Ei tuotteita')).toBeInTheDocument()
    )
  })

  it('renders products correctly', async () => {
    axios.get.mockResolvedValue({ data: mockProducts })
    render(<Tuote />)

    await waitFor(() => {
      const items = screen.getAllByTestId('product-item')
      expect(items).toHaveLength(2)
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })
  })

  it('renders title and description from hook', async () => {
    axios.get.mockResolvedValue({ data: [] })
    render(<Tuote />)

    await waitFor(() => {
      expect(screen.getByText('Test Products Title')).toBeInTheDocument()
      expect(screen.getByText('Test Products Description')).toBeInTheDocument()
    })
  })

  it('renders layout components', async () => {
    axios.get.mockResolvedValue({ data: [] })
    render(<Tuote />)

    await waitFor(() => {
      expect(screen.getByTestId('information')).toBeInTheDocument()
      expect(screen.getByTestId('holyday')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('map')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })
})
