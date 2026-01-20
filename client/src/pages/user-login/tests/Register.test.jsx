// src/components/tests/Register.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { toast } from "react-toastify";
import Register from "../Register";
import { userRegister } from "../../../store/user-auth";

// Mock toast
vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

// Mock Redux actions
vi.mock("../../../store/user-auth", () => ({
  userRegister: vi.fn(),
}));

// Mock translations
vi.mock("../../../languages/loginTranslations", () => ({
  fiUser: {
    firstname: "Etunimi",
    lastname: "Sukunimi",
    emailuser: "Sähköposti",
    passworduser: "Salasana",
    registeruser: "Rekisteröidy",
    selectGender: "Valitse sukupuoli",
    men: "Miehet",
    women: "Naiset",
    notChoosenGender: "Ei valittu",
    selectLanguageuser: "Valitse kieli",
  },
  enUser: {
    firstname: "First Name",
    lastname: "Last Name",
    emailuser: "Email",
    passworduser: "Password",
    registeruser: "Register",
    selectGender: "Select Gender",
    men: "Men",
    women: "Women",
    notChoosenGender: "Not Chosen",
    selectLanguageuser: "Select Language",
  },
}));

const mockStore = configureStore([]);
let store;

describe("Register Component", () => {
  beforeEach(() => {
    store = mockStore({
      userAuth: { isAuthenticated: false, user: null, loading: false },
    });
    store.dispatch = vi.fn(() => ({
      unwrap: () => Promise.resolve({ user: { role: "user" } })
    }));
    vi.clearAllMocks();
  });

  it("renders all input fields and button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    // Query by placeholder using translations
    expect(screen.getByPlaceholderText("Etunimi")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Sukunimi")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Sähköposti")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\*{10,}/)).toBeInTheDocument(); // password
    expect(screen.getByRole("button", { name: /Rekisteröidy/i })).toBeInTheDocument();
  });

  it("shows error if fields are empty on submit", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    const registerBtn = screen.getByRole("button", { name: /Rekisteröidy/i });
    fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("All fields are required!");
    });
  });

  it("shows error if gender is not selected", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Etunimi"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Sukunimi"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Sähköposti"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/\*{10,}/), { target: { value: "password123" } });

    // Gender is still "none"
    const registerBtn = screen.getByRole("button", { name: /Rekisteröidy/i });
    fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please select gender");
    });
  });

  it("dispatches userRegister on form submit", async () => {
    userRegister.mockReturnValue(() => Promise.resolve());

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Etunimi"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Sukunimi"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Sähköposti"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/\*{10,}/), { target: { value: "password123" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "men" } });

    const registerBtn = screen.getByRole("button", { name: /Rekisteröidy/i });
    fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(userRegister).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        gender: "men",
        email: "john@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it("toggles password visibility", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText(/\*{10,}/);
    const passwordContainer = passwordInput.parentElement;
    const toggleBtn = passwordContainer.querySelector("svg");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });
  });
});
