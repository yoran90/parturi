import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddPrice from "../../pages/AddPrice";
import axios from "axios";
import { toast } from "react-toastify";
import { vi } from "vitest";


vi.mock("react-quill-new", () => ({
  default: ({ value, onChange, placeholder }) => (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      data-testid="react-quill-mock"
    />
  ),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock Loading component
vi.mock("../../loading/Loading", () => ({
  default: () => <div data-testid="loading-spinner" />,
}));


describe("AddPrice Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

 test("renders AddPrice form correctly", async () => {
  axios.get.mockResolvedValueOnce({ data: [] }); // no existing prices
  render(<AddPrice />);

  // Wait for form to render after loading
  expect(await screen.findByText(/add price for services/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/e.g., haircut prices/i)).toBeInTheDocument();
  expect(screen.getByTestId("react-quill-mock")).toBeInTheDocument();
  });

  test("adds and removes price sections", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<AddPrice />);

    // Wait for the form to appear
    await screen.findByPlaceholderText(/e.g., haircut prices/i);

    // Initially 1 section
    expect(screen.getAllByPlaceholderText(/e.g., haircut prices/i).length).toBe(1);

    // Add another
    fireEvent.click(screen.getByText(/add another/i));
    expect(screen.getAllByPlaceholderText(/e.g., haircut prices/i).length).toBe(2);

    // Remove first section (trash button)
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getAllByPlaceholderText(/e.g., haircut prices/i).length).toBe(1);
  });

  test("updates input fields correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<AddPrice />);

    const titleInput = await screen.findByPlaceholderText(/e.g., haircut prices/i);
    const serviceInput = screen.getByTestId("react-quill-mock");

    fireEvent.change(titleInput, { target: { value: "Haircut Prices" } });
    fireEvent.change(serviceInput, { target: { value: "Haircut – 33 €" } });

    expect(titleInput.value).toBe("Haircut Prices");
    expect(serviceInput.value).toBe("Haircut – 33 €");
  });

  test("submits form successfully", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.post.mockResolvedValueOnce({ data: {} });
    render(<AddPrice />);

    // Wait for the form to appear after loading
    const titleInput = await screen.findByPlaceholderText(/e.g., haircut prices/i);
    const serviceInput = screen.getByTestId("react-quill-mock");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "Haircut Prices" } });
    fireEvent.change(serviceInput, { target: { value: "Haircut – 33 €" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "https://parturi-backend.onrender.com/api/price/addprice",
      { prices: [{ _id: null, title: "Haircut Prices", service: "Haircut – 33 €" }] },
      { withCredentials: true } 
    );
    expect(toast.success).toHaveBeenCalledWith("Prices added successfully");
  });
  });



  test("shows error if fields are empty on submit", async () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  render(<AddPrice />);

  // Wait for the form to appear (any input or placeholder is fine)
  const titleInput = await screen.findByPlaceholderText(/e.g., haircut prices/i);

  // Now the submit button exists
  const submitButton = screen.getByTestId("submit-button");

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Please fill in all fields");
  });
});

});
