import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import useReviews, { useReviewById, useDeleteReviewById, useDeleteReviewByUser } from "../useReviews";

// Mock axios
vi.mock("axios");

describe("Reviews hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===============================
  // useReviews
  // ===============================
  it("useReviews: should fetch reviews on mount", async () => {
    const mockReviews = [{ id: 1, text: "Great!" }];

    axios.get.mockResolvedValueOnce({ data: mockReviews });

    const { result } = renderHook(() => useReviews());

    await waitFor(() => {
      expect(result.current.getReviews).toEqual(mockReviews);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8001/api/reviwes/getReviews"
    );
  });

  // ===============================
  // useReviewById
  // ===============================
  it("useReviewById: should fetch review by id", async () => {
    const mockReview = { id: "123", text: "Nice" };

    axios.get.mockResolvedValueOnce({ data: mockReview });

    const { result } = renderHook(() => useReviewById("123"));

    await waitFor(() => {
      expect(result.current.getReview).toEqual(mockReview);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8001/api/auth/getReview/123",
      { withCredentials: true }
    );
  });

  // ===============================
  // useDeleteReviewById (admin)
  // ===============================
  it("useDeleteReviewById: should delete review and toggle loading", async () => {
    const mockResponse = { success: true };

    axios.delete.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() =>
      useDeleteReviewById("456")
    );

    expect(result.current.loadingForButton).toBe(false);

    await act(async () => {
      await result.current.deleteReviewHnadler();
    });

    expect(result.current.deleteReview).toEqual(mockResponse);
    expect(result.current.loadingForButton).toBe(false);

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8001/api/auth/deleteReview/456",
      { withCredentials: true }
    );
  });

  // ===============================
  // useDeleteReviewByUser
  // ===============================
  it("useDeleteReviewByUser: should allow user to delete own review", async () => {
    const mockResponse = { deleted: true };

    axios.delete.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useDeleteReviewByUser());

    expect(result.current.loadingForDeleteUserReview).toBe(false);

    await act(async () => {
      await result.current.userDeleteOwnreviewPost("789");
    });

    expect(result.current.userDeleteOwnReview).toEqual(mockResponse);
    expect(result.current.loadingForDeleteUserReview).toBe(false);

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8001/api/reviwes/deleteReview/789",
      { withCredentials: true }
    );
  });
});
