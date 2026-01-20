import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

// Mock react-dom/client to prevent createRoot from executing
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

// Mock the Clock component
vi.mock("./components/clock/Clock.jsx", () => ({
  default: () => <div>Clock Mock</div>,
}));

// Mock the App component
vi.mock("./App.jsx", () => ({
  default: () => <div>App Mock</div>,
}));

// Mock react-toastify
vi.mock("react-toastify", () => ({
  ToastContainer: () => <div className="Toastify__toast-container">Toast Container</div>,
  toast: { error: vi.fn(), success: vi.fn() },
}));

// Now import Root after mocking to prevent mount side effects
import { Root } from "./main";

describe("Root component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Root without crashing", () => {
    render(<Root />);

    // Check that App is rendered
    expect(screen.getByText("App Mock")).toBeInTheDocument();


    // Check that the color picker input exists
    const colorInput = document.querySelector('input[type="color"]');
    expect(colorInput).toBeInTheDocument();

    // Check that the appBackground div exists
    const appBackground = document.getElementById("appBackground");
    expect(appBackground).toBeInTheDocument();
  });

  it("changes background color when color input changes", () => {
    render(<Root />);

    const colorInput = document.querySelector('input[type="color"]');
    const appBackground = document.getElementById("appBackground");

    // Initial color (browser converts hex to rgba)
    expect(appBackground.style.backgroundColor).toBe("rgba(242, 242, 242, 0.88)");

    // Change color (browser converts hex to rgb)
    fireEvent.change(colorInput, { target: { value: "#123456" } });
    expect(appBackground.style.backgroundColor).toBe("rgb(18, 52, 86)");
  });

  it("renders with correct initial state", () => {
    render(<Root />);

    const appBackground = document.getElementById("appBackground");
    expect(appBackground).toHaveStyle("min-height: 100vh");
  });

  it("color input is hidden on mobile (md:flex hidden)", () => {
    render(<Root />);

    const colorInputContainer = document.querySelector('input[type="color"]').closest("div");
    expect(colorInputContainer).toHaveClass("md:flex", "hidden");
  });
});
