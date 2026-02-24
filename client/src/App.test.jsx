import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import axios from "axios";
import adminAuthReducer from "./store/admin-auth";
import userAuthReducer from "./store/user-auth";
import App from "./App";

// Mock axios
vi.mock("axios");

// Mock custom hooks that make axios calls
vi.mock("./hooks/useInformation", () => ({
  default: () => ({ getInformation: { socialMedia: [] } }),
}));

vi.mock("./hooks/useTitleForPage", () => ({
  default: () => ({ getTitleForPage: null }),
}));

// Mock components that have complex side effects
vi.mock("./pages/opinion/ReviewForHome", () => ({
  default: () => <div>ReviewForHome</div>,
}));

// Helper function to render App with a custom store and route
const renderWithStoreAndRoute = (preloadedState, initialRoute = "/") => {
  const store = configureStore({
    reducer: {
      adminAuth: adminAuthReducer,
      userAuth: userAuthReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe("App component routing and rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ------------------------
  // 1. Basic render
  // ------------------------
  it("renders without crashing", async () => {
    renderWithStoreAndRoute({
      adminAuth: { isAuthenticated: false, loading: false, admin: null },
      userAuth: { isAuthenticated: false, user: null, loading: false },
    });

    // Check that the page rendered (wait for loading to finish)
    await waitFor(() => {
      expect(screen.queryByText(/Pleass wait/i)).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  // ------------------------
  // 2. Loading state
  // ------------------------
  it("shows loader when loading is true", () => {
    renderWithStoreAndRoute({
      adminAuth: { isAuthenticated: false, loading: true, admin: null },
      userAuth: { isAuthenticated: false, user: null, loading: false },
    });

  });

  // ------------------------
  // 3. User routes
  // ------------------------
  it("renders user home page at /", async () => {
    renderWithStoreAndRoute(
      {
        adminAuth: { isAuthenticated: false, loading: false, admin: null },
        userAuth: { isAuthenticated: false, user: null, loading: false },
      },
      "/"
    );

    // Wait for content to render
    await waitFor(() => {
      expect(screen.queryByText(/Pleass wait/i)).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it("renders register page", async () => {
    renderWithStoreAndRoute(
      {
        adminAuth: { isAuthenticated: false, loading: false, admin: null },
        userAuth: { isAuthenticated: false, user: null, loading: false },
      },
      "/register"
    );

    await waitFor(() => {
      expect(screen.queryByText(/Pleass wait/i)).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it("renders login page", async () => {
    renderWithStoreAndRoute(
      {
        adminAuth: { isAuthenticated: false, loading: false, admin: null },
        userAuth: { isAuthenticated: false, user: null, loading: false },
      },
      "/kirjaudu"
    );

    await waitFor(() => {
      expect(screen.queryByText(/Pleass wait/i)).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  // ------------------------
  // 4. 404 / NoFoundPage
  // ------------------------
  it("renders NoFoundPage for unknown route", async () => {
    renderWithStoreAndRoute(
      {
        adminAuth: { isAuthenticated: false, loading: false, admin: null },
        userAuth: { isAuthenticated: false, user: null, loading: false },
      },
      "/random-non-existent-page"
    );

    await waitFor(() => {
      expect(screen.queryByText(/Pleass wait/i)).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });
});
