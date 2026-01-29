import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddInformation from "../../pages/AddInformation";
import { vi } from "vitest";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

vi.mock("axios");

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: () => vi.fn(),
}));
vi.mock("../../loading/Loading", () => ({
  default: () => <div data-testid="loading" />,
}));

vi.mock("react-quill-new", () => ({
  default: ({ value, onChange }) => (
    <textarea data-testid="quill" value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}));

describe("AddInformation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSelector.mockImplementation(cb => cb({ adminAuth: { isLoading: false } }));
  });

  test("renders AddInformation form", async () => {
    render(<AddInformation />);
    expect(await screen.findByText(/addinformation/i)).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
  });

  test("updates input fields correctly", async () => {
    render(<AddInformation />);
    const phoneInput = await screen.findByTestId("phone-input");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(phoneInput.value).toBe("1234567890");
  });

  test("adds and removes social media fields", async () => {
    render(<AddInformation />);
    expect(await screen.findAllByTestId(/social-url-/i)).toHaveLength(1);

    fireEvent.click(screen.getByText(/add another sosiamedia/i));
    expect(await screen.findAllByTestId(/social-url-/i)).toHaveLength(2);

    fireEvent.click(screen.getAllByRole("button", { name: "" })[0]); // remove first
    expect(await screen.findAllByTestId(/social-url-/i)).toHaveLength(1);
  });

  test("submits form successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(<AddInformation />);
    fireEvent.change(await screen.findByTestId("phone-input"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText(/example@example.com/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/enter your address/i), { target: { value: "My Street 1" } });
    fireEvent.change(screen.getByPlaceholderText(/enter your location/i), { target: { value: "My Street 2" } });

    fireEvent.click(screen.getByTestId("submit-button"));


    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Information added successfully");
    });
  });

  test("shows loading when isLoading is true", async () => {
    useSelector.mockImplementation(cb => cb({ adminAuth: { isLoading: true } }));
    render(<AddInformation />);
    expect(await screen.findByTestId("loading")).toBeInTheDocument();
  });
});
