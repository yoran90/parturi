import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Meistä from './Meistä'

// --------------------
// MOCK COMPONENTS
// --------------------
vi.mock('../components/header/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('../components/up-header/Information', () => ({
  default: () => <div data-testid="information">Information</div>,
}))

vi.mock('../components/map/Map', () => ({
  default: () => <div data-testid="map">Map</div>,
}))

vi.mock('../components/footer/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}))

vi.mock('../components/holy-day/HolyDay', () => ({
  default: () => <div data-testid="holyday">HolyDay</div>,
}))

vi.mock('./GallaryLimit', () => ({
  default: () => <div data-testid="gallery">GalleryLimit</div>,
}))

// --------------------
// MOCK HOOK
// --------------------
vi.mock('../hooks/useAboutUs', () => ({
  default: () => ({
    getAboutUs: {
      image: 'test-image.jpg',
      imageTitles: ['Title One', 'Title Two'],
      sections: [
        {
          title: 'Section 1',
          description: '<p>Section 1 description</p>',
        },
        {
          title: 'Section 2',
          description: '<p>Section 2 description</p>',
        },
      ],
    },
  }),
}))

// --------------------
// TESTS
// --------------------
describe('Meistä page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Meistä />
      </MemoryRouter>
    )
  })

  it('renders static layout components', () => {
    expect(screen.getByTestId('information')).toBeInTheDocument()
    expect(screen.getByTestId('holyday')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('map')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders hero image', () => {
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'test-image.jpg')
  })

  it('renders image titles', () => {
    expect(screen.getByText('Title One')).toBeInTheDocument()
    expect(screen.getByText('Title Two')).toBeInTheDocument()
  })

  it('renders about us sections', () => {
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 1 description')).toBeInTheDocument()

    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 2 description')).toBeInTheDocument()
  })

  it('renders gallery section and link', () => {
    expect(screen.getByTestId('gallery')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /kasto galleria/i })
    expect(link).toHaveAttribute('href', '/galleria')
  })
})
