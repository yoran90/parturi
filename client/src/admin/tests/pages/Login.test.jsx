import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "../../pages/Login";
import { toast } from "react-toastify";


// mock toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// mock adminLogin thunk
vi.mock("../../store/admin-auth/index.js", () => ({
  adminLogin: vi.fn(() => ({
    unwrap: () => Promise.resolve({ admin: { role: "admin" } }),
  })),
}));

// mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// mock axios
vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));



const adminAuthReducer = (
  state = { isAuthenticated: false, admin: null, loading: false },
  action
) => state;

const createTestStore = () =>
  configureStore({
    reducer: {
      adminAuth: adminAuthReducer,
    },
  });



const setup = () => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
};



describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login page", () => {
    setup();

    expect(
      screen.getByText(/Tervetuloa ylläpitäjän kirjautumiseen/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Sähköpostiosoitteesi/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/\*{10,}/)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Kirjaudu sisään/i })
    ).toBeInTheDocument();
  });

  it("validates missing email", () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/\*{10,}/), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Kirjaudu sisään/i })
    );

    expect(toast.error).toHaveBeenCalledWith("Please enter your email");
  });

  it("validates missing password", () => {
    setup();

    fireEvent.change(
      screen.getByPlaceholderText(/Sähköpostiosoitteesi/i),
      {
        target: { value: "admin@test.com" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Kirjaudu sisään/i })
    );

    expect(toast.error).toHaveBeenCalledWith("Please enter your password");
  });

  it("does not submit empty form", () => {
    setup();

    fireEvent.click(
      screen.getByRole("button", { name: /Kirjaudu sisään/i })
    );

    const emailInput = screen.getByPlaceholderText(
      /Sähköpostiosoitteesi/i
    );
    const passwordInput = screen.getByPlaceholderText(/\*{10,}/);

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(toast.error).toHaveBeenCalled();
  });

  it("renders resend verification email button", () => {
    setup();

    expect(
      screen.getByText(/Lähetä vahvistussähköposti uudelleen/i)
    ).toBeInTheDocument();
  });

  it("opens language dropdown and shows English option", () => {
    setup();

    fireEvent.click(screen.getByText(/Valitse Kieli/i));

    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/Suomi/i)).toBeInTheDocument();
  });
});
