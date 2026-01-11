import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddProduct from "../../pages/AddProduct";
import axios from "axios";
import { toast } from "react-toastify";

vi.mock("axios", () => ({ default: { post: vi.fn() } }));
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));
vi.mock("react-quill-new", () => ({
  default: ({ value, onChange, placeholder }) => (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      data-testid="react-quill"
    />
  ),
}));
vi.mock("../../loading/Loading", () => ({
  default: () => <div data-testid="loading-spinner" />,
}));

describe("AddProduct Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders AddProduct form", async () => {
    render(<AddProduct />);
    expect(screen.getByPlaceholderText(/enter product title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/00.00€/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter product description/i)).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("shows error when required fields are empty", async () => {
    render(<AddProduct />);
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please add a title");
    });
  });

  test("submits form successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Product added successfully" } });
    render(<AddProduct />);
    
    fireEvent.change(screen.getByPlaceholderText(/enter product title/i), { target: { value: "Test Product" } });
    fireEvent.change(screen.getByPlaceholderText(/00.00€/i), { target: { value: "99" } });
    fireEvent.change(screen.getByTestId("react-quill"), { target: { value: "Test Description" } });

    // Add a fake image
    const file = new File(["dummy"], "image.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(/upload image/i) || screen.getByTestId("image-input");
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Product added successfully");
    });
  });
});
