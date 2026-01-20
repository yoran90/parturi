import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useHeaderPages from "../useHeaderPages";

// Mock axios
vi.mock("axios");

describe("useHeaderPages hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch header pages successfully", async () => {
    const mockData = [
      { id: 1, title: "Home" },
      { id: 2, title: "About" }
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useHeaderPages());

    // initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.getHeaderPages).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getHeaderPages).toEqual(mockData);
    expect(result.current.error).toBe(null);

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8001/api/headerPages/getHeaderPages"
    );
  });

  it("should handle API error correctly", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useHeaderPages());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getHeaderPages).toEqual([]);
    expect(result.current.error).toBe("Network error");
    expect(axios.get).toHaveBeenCalledOnce();
  });
});
