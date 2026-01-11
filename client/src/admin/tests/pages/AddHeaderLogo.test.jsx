import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddHeaderLogo from "../../pages/AddHeaderLogo";
import { vi } from "vitest";
import axios from "axios";
import { toast } from "react-toastify";


vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));


vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));


const setHeaderLogoMock = vi.fn();


vi.mock("../../../hooks/useHeaderLogo", () => ({
  default: () => ({
    headerLogo: null,
    setHeaderLogo: setHeaderLogoMock,
  }),
}));


vi.mock("../../loading/Loading", () => ({
  default: () => <div data-testid="loading" />,
}));

describe("AddHeaderLogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders AddHeaderLogo page", () => {
    render(<AddHeaderLogo />);
    expect(screen.getByText(/add header logo/i)).toBeInTheDocument();
  });

  test("shows error when submitting without selecting file", () => {
    render(<AddHeaderLogo />);
    fireEvent.click(screen.getByRole("button", { name: /upload header logo/i }));
    expect(toast.error).toHaveBeenCalledWith("Please select a file to upload");
  });

  test("shows image preview after file selection", () => {
    render(<AddHeaderLogo />);
    const file = new File(["img"], "logo.png", { type: "image/png" });
    const input = document.querySelector("#imageVideo");
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("uploads header logo successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: { logo: { url: "http://example.com/logo.png" } },
    });

    render(<AddHeaderLogo />);
    const file = new File(["img"], "logo.png", { type: "image/png" });
    const input = document.querySelector("#imageVideo");
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /upload header logo/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Header logo uploaded successfully!");
      expect(setHeaderLogoMock).toHaveBeenCalledWith({ url: "http://example.com/logo.png" });
    });
  });
});
