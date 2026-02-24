import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import GoogleLoginButton from '../GoogleLoginButton'

describe('GoogleLoginButton Component', () => {

  beforeEach(() => {
    window.google = {
      accounts: {
        id: {
          initialize: vi.fn(),
          renderButton: vi.fn(),
        },
      },
    }

    import.meta.env.VITE_GOOGLE_CLIENT_ID = 'mocked-google-client-id'
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes Google login and renders button', () => {
    const onSuccessMock = vi.fn()

    render(<GoogleLoginButton onSuccess={onSuccessMock} />)

    expect(window.google.accounts.id.initialize).toHaveBeenCalledWith({
      client_id: 'mocked-google-client-id',
      callback: onSuccessMock,
    })

    expect(window.google.accounts.id.renderButton).toHaveBeenCalledWith(
      document.getElementById('googleLoginDiv'),
      {
        theme: 'filled_white',
        size: 'large',
        text: 'continue_with',
        width: '100%',
        logo_alignment: 'center',
      }
    )
  })

  it('does not crash if google is undefined', () => {
    delete window.google

    const onSuccessMock = vi.fn()

    expect(() =>
      render(<GoogleLoginButton onSuccess={onSuccessMock} />)
    ).not.toThrow()
  })
})