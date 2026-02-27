// src/components/__tests__/YksiTuoate.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import YksiTuoate from '../YksiTuoate'

describe('YksiTuoate component', () => {
  const mockProduct = {
    id: '123',
    images: [{ url: 'image1.jpg' }, { url: 'image2.jpg' }],
    title: 'This is a really long product title that should be truncated',
    description: 'This is a very long description that should also be truncated at 100 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 100,
    discount: 20,
  }

  const renderComponent = (props = {}) => {
    return render(
      <Router>
        <YksiTuoate {...mockProduct} {...props} />
      </Router>
    )
  }

  test('renders product link correctly', () => {
    renderComponent()
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', `/tuote/${mockProduct.id}`)
  })

  test('renders product image', () => {
    renderComponent()
    const image = screen.getByAltText(mockProduct.title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProduct.images[0].url)
  })

  test('renders truncated title', () => {
    renderComponent()
    const titleElement = screen.getByText(/This is a reall\.\.\./i)
    expect(titleElement).toBeInTheDocument()
  })

  test('renders truncated description', () => {
    renderComponent()
    const descriptionElement = screen.getByText(/This is a very long description that should also be truncated at 100 characters.../i)
    expect(descriptionElement).toBeInTheDocument()
  })

  test('renders discounted price correctly', () => {
    renderComponent()
    const discountedPrice = (mockProduct.price - (mockProduct.price * mockProduct.discount) / 100).toFixed(2)
    expect(screen.getByText(`${discountedPrice}€`)).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`${mockProduct.price.toFixed(2)}€`))
    ).toBeInTheDocument()
    expect(screen.getByText(`${mockProduct.discount}%`)).toBeInTheDocument()
  })

  test('renders price correctly if no discount', () => {
    renderComponent({ discount: 0 })
    expect(
      screen.getByText(new RegExp(`${mockProduct.price.toFixed(2)}€`))
    ).toBeInTheDocument()
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
  })
})
