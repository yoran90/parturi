import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useGallery from "../useGallery";

// Mock axios
vi.mock("axios");

describe("useGallery hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch gallery images and format data correctly", async () => {
    const mockApiResponse = {
      data: {
        data: [
          {
            _id: "gallery1",
            images: [
              { url: "img1.jpg", publicId: "p1" },
              { url: "img2.jpg", publicId: "p2" }
            ]
          },
          {
            _id: "gallery2",
            images: [
              { url: "img3.jpg", publicId: "p3" }
            ]
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(() => useGallery());

    // loading should be true initially
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.galleryImages).toEqual([
      {
        galleryId: "gallery1",
        url: "img1.jpg",
        publicId: "p1"
      },
      {
        galleryId: "gallery1",
        url: "img2.jpg",
        publicId: "p2"
      },
      {
        galleryId: "gallery2",
        url: "img3.jpg",
        publicId: "p3"
      }
    ]);

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8001/api/media/galleryImages"
    );
  });

  it("should stop loading when API request fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useGallery());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.galleryImages).toEqual([]);
    expect(axios.get).toHaveBeenCalledOnce();
  });
});
