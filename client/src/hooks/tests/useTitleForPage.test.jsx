import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useTitleForPage from "../useTitleForPage";

vi.mock("axios");

describe("useTitleForPage hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch title for page on mount", async () => {
    const mockData = { title: "Home Page" };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useTitleForPage());

    await waitFor(() => {
      expect(result.current.getTitleForPage).toEqual(mockData);
    });
  });

  it("should allow manual update via setGetTitleForPage", async () => {
    const initialData = { title: "Initial Page" };
    const newTitle = { title: "About Us" };

    // Mock the initial API call
    axios.get.mockResolvedValueOnce({ data: initialData });

    const { result } = renderHook(() => useTitleForPage());

    // wait for initial fetch to complete
    await waitFor(() => {
      expect(result.current.getTitleForPage).toEqual(initialData);
    });

    // wrap manual state update in act
    await act(async () => {
      result.current.setGetTitleForPage(newTitle);
    });

    expect(result.current.getTitleForPage).toEqual(newTitle);
  });
});
