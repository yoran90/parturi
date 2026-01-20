import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useShop from "../useShop";

vi.mock("axios");

describe("useShop hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch shop media on mount", async () => {
    const mockData = { items: ["item1", "item2"] };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useShop());

    await waitFor(() => {
      expect(result.current.getShope).toEqual(mockData);
    });
  });

  it("should fetch shop media when fetchShopMedia is called manually", async () => {
    const firstData = { items: ["item1"] };
    const secondData = { items: ["item2"] };

    // 👇 TWO calls → TWO mocks
    axios.get
      .mockResolvedValueOnce({ data: firstData })   // useEffect
      .mockResolvedValueOnce({ data: secondData }); // manual call

    const { result } = renderHook(() => useShop());

    // wait for initial fetch
    await waitFor(() => {
      expect(result.current.getShope).toEqual(firstData);
    });

    // manual fetch
    await act(async () => {
      await result.current.fetchShopMedia();
    });

    expect(result.current.getShope).toEqual(secondData);
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
