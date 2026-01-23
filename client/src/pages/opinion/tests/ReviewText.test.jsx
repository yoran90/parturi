import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ReviewText from "../ReviewText";

describe("ReviewText", () => {
  const longText =
    "This is a very long review text that should exceed four lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae magna eget odio faucibus.";

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = "";

    // Mock getComputedStyle for lineHeight
    vi.spyOn(window, "getComputedStyle").mockImplementation(() => {
      return { lineHeight: "20px" };
    });
  });

  it("renders short text without toggle button", () => {
    render(<ReviewText text="Short review text." />);
    expect(screen.getByText("Short review text.")).toBeInTheDocument();
    expect(screen.queryByText(/Read more/i)).not.toBeInTheDocument();
  });

  it("renders long text with toggle button", () => {
    // Mock scrollHeight to be larger than 4 lines
    Object.defineProperty(HTMLParagraphElement.prototype, "scrollHeight", {
      configurable: true,
      value: 500,
    });

    render(<ReviewText text={longText} />);
    const button = screen.getByText(/Read more/i);
    expect(button).toBeInTheDocument();
  });

  it("expands and collapses text when clicking toggle button", () => {
    Object.defineProperty(HTMLParagraphElement.prototype, "scrollHeight", {
      configurable: true,
      value: 500,
    });

    render(<ReviewText text={longText} />);
    const toggleButton = screen.getByText(/Read more/i);

    // Click to expand
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe("Read less");

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe("Read more");
  });
});
