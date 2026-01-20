import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import GoogleLoginButton from '../GoogleLoginButton'

// --------------------
// Mock Google API
// --------------------
beforeEach(() => {
  // Mock Google accounts API
  window.google = {
    accounts: {
      id: {
        initialize: vi.fn(),
        renderButton: vi.fn(),
      },
    },
  }

  // Mock import.meta.env directly before tests
  vi.stubGlobal('import', {
    meta: {
      env: {
        VITE_GOOGLE_CLIENT_ID: 'mocked-google-client-id', // Mocked value
      },
    },
  })
})

afterEach(() => {
  vi.clearAllMocks() // Clear mocks
  vi.unstubAllGlobals() // Unstub all global mocks after each test
})

// --------------------
// Tests
// --------------------
describe('GoogleLoginButton Component', () => {
  it('initializes Google login and renders button', () => {
    const onSuccessMock = vi.fn()

    render(<GoogleLoginButton onSuccess={onSuccessMock} />)

    // Debugging: Log the arguments to ensure correct values
    console.log(window.google.accounts.id.initialize.mock.calls)

    // Assert that the Google API `initialize` method was called with the correct client_id
    expect(window.google.accounts.id.initialize).toHaveBeenCalledWith({
      client_id: '818467309105-te7c4oo559nqemmqt0fkn43sfabrkhh6.apps.googleusercontent.com', 
      callback: onSuccessMock,
    })

    // Assert renderButton method is also called with the correct parameters
    expect(window.google.accounts.id.renderButton).toHaveBeenCalledWith(
      document.getElementById('googleLoginDiv'),
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: '100%',
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
