import "@testing-library/jest-dom" // Proper import for jest-dom

// Mock import.meta.env
globalThis.import = {
  meta: {
    env: {
      VITE_GOOGLE_CLIENT_ID: 'test-google-client-id', // Mock your Google client ID here
    },
  },
}
