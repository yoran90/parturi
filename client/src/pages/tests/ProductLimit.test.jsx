import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ProductLimit from '../ProductLimit'
import axios from 'axios'

// --------------------
// MOCK AXIOS
// --------------------
vi.mock('axios')

// --------------------
// MOCK CHILD COMPONENT
// --------------------
vi.mock('../YksiTuoate', () => ({
  default: ({ title, price }) => (
    <div data-testid="product-item">
      <p>{title}</p>
      <span>{price}</span>
    </div>
  ),
}))

// --------------------
// MOCK DATA
// --------------------
const mockProducts = [
  {
    _id: '1',
    title: 'Product One',
    price: 10,
    images: [],
    discount: 0,
    description: 'Desc 1',
  },
  {
    _id: '2',
    title: 'Product Two',
    price: 20,
    images: [],
    discount: 5,
    description: 'Desc 2',
  },
]

// --------------------
// TESTS
// --------------------
describe('ProductLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    axios.get.mockResolvedValue({
      data: mockProducts,
    })
  })

  it('shows loading text initially', () => {
    render(<ProductLimit />)

    expect(
      screen.getByText('Ladataan tuotteita...')
    ).toBeInTheDocument()
  })

  it('fetches products and renders them', async () => {
    render(<ProductLimit />)

    await waitFor(() => {
      expect(screen.getAllByTestId('product-item')).toHaveLength(2)
    })

    expect(screen.getByText('Product One')).toBeInTheDocument()
    expect(screen.getByText('Product Two')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('calls products API with correct URL', async () => {
    render(<ProductLimit />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8001/api/products/getAllProducts?limit=4'
      )
    })
  })
})
