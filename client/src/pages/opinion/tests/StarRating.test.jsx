import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StarRating from "../StartRating";

describe("StarRating", () => {
  it("renders 5 stars", () => {
    const setRating = vi.fn();

    render(<StarRating rating={0} setRating={setRating} />);

    const stars = [
      screen.getByTestId("star-1"),
      screen.getByTestId("star-2"),
      screen.getByTestId("star-3"),
      screen.getByTestId("star-4"),
      screen.getByTestId("star-5"),
    ];

    expect(stars).toHaveLength(5);
  });

  it("colors stars according to rating", () => {
    const setRating = vi.fn();

    render(<StarRating rating={3} setRating={setRating} />);

    expect(screen.getByTestId("star-1")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-2")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-3")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-4")).toHaveAttribute("color", "#e4e5e3");
    expect(screen.getByTestId("star-5")).toHaveAttribute("color", "#e4e5e3");
  });

  it("calls setRating when a star is clicked", () => {
    const setRating = vi.fn();

    render(<StarRating rating={0} setRating={setRating} />);

    fireEvent.click(screen.getByTestId("star-3"));

    expect(setRating).toHaveBeenCalledTimes(1);
    expect(setRating).toHaveBeenCalledWith(3);
  });

  it("changes color on hover and resets on mouse leave", () => {
    const setRating = vi.fn();

    render(<StarRating rating={2} setRating={setRating} />);

    const star4 = screen.getByTestId("star-4");

    // hover
    fireEvent.mouseEnter(star4);

    expect(screen.getByTestId("star-1")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-2")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-3")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-4")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-5")).toHaveAttribute("color", "#e4e5e3");

    // leave
    fireEvent.mouseLeave(star4);

    expect(screen.getByTestId("star-1")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-2")).toHaveAttribute("color", "#ffc107");
    expect(screen.getByTestId("star-3")).toHaveAttribute("color", "#e4e5e3");
  });
});
