import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import TuoateSivu from './TuoateSivu'

// --------------------
// MOCK AXIOS
// --------------------
vi.mock('axios')

// --------------------
// MOCK LAYOUT COMPONENTS
// --------------------
vi.mock('../components/up-header/Information', () => ({
  default: () => <div data-testid="information" />,
}))

vi.mock('../components/header/Header', () => ({
  default: () => <div data-testid="header" />,
}))

vi.mock('../components/map/Map', () => ({
  default: () => <div data-testid="map" />,
}))

vi.mock('../components/footer/Footer', () => ({
  default: () => <div data-testid="footer" />,
}))

vi.mock('../components/holy-day/HolyDay', () => ({
  default: () => <div data-testid="holyday" />,
}))

vi.mock('./ProductLimit', () => ({
  default: () => <div data-testid="product-limit" />,
}))

// --------------------
// MOCK DATA
// --------------------
const mockProduct = {
  _id: '1',
  title: 'Test Product',
  price: 100,
  discount: 20,
  description: '<p>Product description</p>',
  images: [
    { url: 'image-1.jpg' },
    { url: 'image-2.jpg' },
  ],
}

// --------------------
// TESTS
// --------------------
describe('TuoateSivu', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    axios.get.mockResolvedValue({
      data: mockProduct,
    })
  })

  const renderPage = () =>
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<TuoateSivu />} />
        </Routes>
      </MemoryRouter>
    )

  it('shows loading state initially', () => {
    renderPage()
    expect(screen.getByText('Ladataan tuotte...')).toBeInTheDocument()
  })

  it('renders product title and description', async () => {
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    expect(screen.getByText('Product description')).toBeInTheDocument()
  })

  it('renders main product image', async () => {
  renderPage()

  await waitFor(() => {
    expect(
      screen.getAllByRole('img', { name: 'Test Product' }).length
    ).toBeGreaterThan(0)
  })

  const mainImage = screen.getAllByRole('img', {
    name: 'Test Product',
  })[0]

  expect(mainImage).toHaveAttribute('src', 'image-1.jpg')
})


  it('changes main image when thumbnail is clicked', async () => {
  const user = userEvent.setup()
  renderPage()

  // wait for all images to render
  await waitFor(() =>
    expect(
      screen.getAllByRole('img', { name: 'Test Product' }).length
    ).toBeGreaterThan(1)
  )

  // get all images
  let allImages = screen.getAllByRole('img', { name: 'Test Product' })
  expect(allImages.length).toBe(3) // 1 main + 2 thumbnails

  // verify initial state - main image should show first image
  let mainImage = allImages[0]
  expect(mainImage).toHaveAttribute('src', 'image-1.jpg')

  // click the second thumbnail (not the main image)
  const thumbnail = allImages[2]
  await user.click(thumbnail)

  // wait for the main image src to change
  await waitFor(
    () => {
      allImages = screen.getAllByRole('img', { name: 'Test Product' })
      mainImage = allImages[0]
      expect(mainImage).toHaveAttribute('src', 'image-2.jpg')
    },
    { timeout: 5000 }
  )
})




  it('renders discounted price correctly', async () => {
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('80.00€')).toBeInTheDocument()
    })

    expect(screen.getByText('20% alennus')).toBeInTheDocument()
    expect(screen.getByText('100€')).toBeInTheDocument()
  })

  it('renders ProductLimit section', async () => {
    renderPage()

    await waitFor(() => {
      expect(screen.getByTestId('product-limit')).toBeInTheDocument()
    })
  })

  it('renders layout components', async () => {
    renderPage()

    await waitFor(() => {
      expect(screen.getByTestId('information')).toBeInTheDocument()
      expect(screen.getByTestId('holyday')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('map')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })
})
