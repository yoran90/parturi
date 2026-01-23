import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, afterEach, vi, beforeEach } from "vitest";
import GallaryLimit from "../GallaryLimit";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("GallaryLimit Component", () => {
  const mockData = {
    data: {
      data: [
        {
          images: [
            { url: "image1.jpg" },
            { url: "image2.jpg" },
            { url: "image3.jpg" },
            { url: "image4.jpg" },
            { url: "image5.jpg" },
          ],
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    vi.mocked(axios).get.mockResolvedValueOnce(mockData);

    render(<GallaryLimit />);

    // Wait for images to be fetched and rendered
    await waitFor(() => {
      const images = screen.queryAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it("fetches and displays up to 4 images", async () => {
    vi.mocked(axios).get.mockResolvedValueOnce(mockData);

    render(<GallaryLimit />);

    // Wait for images to be rendered
    await waitFor(() => {
      const images = screen.queryAllByRole("img");
      expect(images.length).toBe(4); // limited to 4
      expect(images[0]).toHaveAttribute("src", "image1.jpg");
      expect(images[3]).toHaveAttribute("src", "image4.jpg");
    }, { timeout: 2000 });
  });

  it("renders nothing if gallery is empty", async () => {
    vi.mocked(axios).get.mockResolvedValueOnce({ data: { data: [] } });

    render(<GallaryLimit />);

    // Wait a tick
    await waitFor(() => {
      const images = screen.queryAllByRole("img");
      expect(images.length).toBe(0);
    }, { timeout: 2000 });
  });

  it("logs error if axios fails", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.mocked(axios).get.mockRejectedValueOnce(new Error("Network Error"));

    render(<GallaryLimit />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    }, { timeout: 2000 });

    consoleSpy.mockRestore();
  });
});
