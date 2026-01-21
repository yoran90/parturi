import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SuccessMessage from './SuccessMessage'

describe('SuccessMessage', () => {
  it('renders success texts', () => {
    render(<SuccessMessage close={vi.fn()} />)

    expect(
      screen.getByText('Viesti on lähetetty onnistuneesti.')
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Kiitos viestistä!/i)
    ).toBeInTheDocument()
  })

  it('renders success icon image', () => {
    render(<SuccessMessage close={vi.fn()} />)

    // alt="" → decorative image
    const image = screen.getByAltText('')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      'https://img.icons8.com/ios11/512/40C057/ok.png'
    )
  })

  it('calls close when OK button is clicked', async () => {
    const user = userEvent.setup()
    const closeMock = vi.fn()

    render(<SuccessMessage close={closeMock} />)

    const button = screen.getByRole('button', { name: /ok/i })
    await user.click(button)

    expect(closeMock).toHaveBeenCalledTimes(1)
  })

  it('renders modal overlay', () => {
    const { container } = render(<SuccessMessage close={vi.fn()} />)

    const overlay = container.firstChild
    expect(overlay).toHaveClass('fixed')
  })
})
