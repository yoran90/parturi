import { jest, test, beforeEach, describe, expect } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

// Mock Cloudinary
jest.unstable_mockModule("cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
    },
  },
}));

const { v2: cloudinary } = await import("cloudinary");

describe("About Us Controller", () => {
  beforeEach(() => {
    // Mock Cloudinary upload response
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "https://fake-cloudinary-image.com/test.jpg",
    });
  });

  test("should return 400 if image missing", async () => {
    const res = await request(app)
      .post("/api/about-us/aboutUs")
      .field("imageTitles", JSON.stringify([]))
      .field("sections", JSON.stringify([]));
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Image is required");
  });



});
