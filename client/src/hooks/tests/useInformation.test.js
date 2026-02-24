import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useInformation from "../useInformation";

// Mock axios
vi.mock("axios");

describe("useInformation hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch information successfully", async () => {
    const mockData = {
      name: "Company Info",
      address: "Test Address"
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useInformation());

    // initial state
    expect(result.current.getInformation).toBe(null);
    expect(result.current.informationLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.getInformation).toEqual(mockData);
    });

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(
      "https://parturi-backend.onrender.com/api/information/getInformation"
    );
  });

  it("should keep getInformation null when API fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useInformation());

    await waitFor(() => {
      expect(result.current.getInformation).toBe(null);
    });

    expect(axios.get).toHaveBeenCalledOnce();
  });
});
