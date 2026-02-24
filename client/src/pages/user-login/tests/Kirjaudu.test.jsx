// src/components/tests/Kirjaudu.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import Kirjaudu from "../Kirjaudu";
import { userLogin } from "../../../store/user-auth";
import { toast } from "react-toastify";


vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));


vi.mock("../../../store/user-auth", () => ({
  userLogin: vi.fn(),
  googleLogin: vi.fn(),
  userLogout: vi.fn(),
}));

vi.mock("axios");

const mockStore = configureStore([]);
let store;

describe("Kirjaudu Component", () => {
  beforeEach(() => {
    store = mockStore({
      userAuth: { isAuthenticated: false, user: null },
    });
    store.dispatch = vi.fn();
    vi.clearAllMocks();
  });

  it("renders email and password inputs", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Kirjaudu />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Sähköpostiosoitteesi")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*******************")).toBeInTheDocument();
  });

  it("shows error if email or password is empty", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Kirjaudu />
        </MemoryRouter>
      </Provider>
    );

    const submitBtn = screen.getByRole("button", { name: /Kirjaudu/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please enter your email");
    });
  });

  it("dispatches userLogin on form submit", async () => {
    const mockResponse = { user: { role: "user" } };
    userLogin.mockReturnValue(() => Promise.resolve(mockResponse));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Kirjaudu />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Sähköpostiosoitteesi"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("*******************"), {
      target: { value: "password123" },
    });

    const submitBtn = screen.getByRole("button", { name: /Kirjaudu/i });

    await fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(userLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("resends verification email via axios", async () => {
    axios.post.mockResolvedValue({ data: { message: "Email sent" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Kirjaudu />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Sähköpostiosoitteesi"), {
      target: { value: "test@example.com" },
    });

    const buttons = screen.getAllByRole("button");
    const resendBtn = buttons.find(btn => 
      btn.textContent.toLowerCase().includes("?")
    );
    expect(resendBtn).toBeDefined();
    fireEvent.click(resendBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://parturi-backend.onrender.com/api/user/send-verification-email",        
        { email: "test@example.com" },
        { withCredentials: true }
      );
    });
  });

  it("toggles password visibility", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Kirjaudu />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("*******************");
    const passwordContainer = passwordInput.parentElement;
    const toggleBtn = passwordContainer.querySelector("svg");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });
  });
});
