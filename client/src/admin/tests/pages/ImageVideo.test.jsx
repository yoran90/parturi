import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import ImageVideo from "../../pages/ImageVideo";
import axios from "axios";
import { toast } from "react-toastify";

vi.mock("axios");

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// 🔧 Mock preview URL
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => "mock-preview-url");
});

// 🔧 Prevent reload crash
beforeAll(() => {
  Object.defineProperty(window, "location", {
    value: { reload: vi.fn() },
    writable: true,
  });
});

beforeEach(() => {
  vi.clearAllMocks();
});

const setup = () => render(<ImageVideo />);

describe("ImageVideo Component", () => {
  it("renders upload form", () => {
    setup();
    expect(
      screen.getByText(/add media/i)
    ).toBeInTheDocument();
  });

  it("shows error if submitted with no file", async () => {
    setup();

    fireEvent.click(
      screen.getByRole("button", { name: /upload media/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please select a file to upload."
      );
    });
  });

  it("shows error if media type is missing", async () => {
    setup();

    const file = new File(["img"], "test.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByTestId("file-input"), {
      target: { files: [file] },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /upload media/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please select a media type."
      );
    });
  });

  it("adds preview when file is selected", async () => {
    setup();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "image" },
    });

    const file = new File(["img"], "test.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByTestId("file-input"), {
      target: { files: [file] },
    });

    await waitFor(() => {
      const img = document.querySelector('img[src="mock-preview-url"]');
      expect(img).toBeInTheDocument();
    });

  });

  it("uploads media successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: true, data: {} },
    });

    setup();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "image" },
    });

    fireEvent.change(
      screen.getByPlaceholderText(/short description/i),
      { target: { value: "test image" } }
    );

    const file = new File(["img"], "test.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByTestId("file-input"), {
      target: { files: [file] },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /upload media/i })
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        "Media uploaded successfully."
      );
    });
  });

  it("handles upload failure gracefully", async () => {
    axios.post.mockRejectedValueOnce(new Error("Upload failed"));

    setup();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "image" },
    });

    const file = new File(["img"], "test.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByTestId("file-input"), {
      target: { files: [file] },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /upload media/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Upload failed");
    });
  });
});
