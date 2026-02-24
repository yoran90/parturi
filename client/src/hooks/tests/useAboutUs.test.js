import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useAboutUs from "../useAboutUs";

// Mock axios
vi.mock("axios");

describe("useAboutUs hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and set about us data on success", async () => {
    const mockData = {
      title: "About Us",
      description: "This is about us"
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useAboutUs());

    await waitFor(() => {
      expect(result.current.getAboutUs).toEqual(mockData);
    });

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(
      "https://parturi-backend.onrender.com/api/about-us/aboutUs"
    );
  });

  it("should set getAboutUs to null when API fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAboutUs());

    await waitFor(() => {
      expect(result.current.getAboutUs).toBeNull();
    });

    expect(axios.get).toHaveBeenCalledOnce();
  });
});
