import { jest, test, beforeEach, describe, expect } from "@jest/globals";



jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: {
    uploader: {
      upload: jest.fn(),
      destroy: jest.fn(),
    },
    config: jest.fn(),
  },
}));


import request from "supertest";
import app from "../../app.js";
import cloudinary from "../../config/cloudinary.js";


describe("About Us Controller", () => {
  beforeEach(() => {
    cloudinary.uploader.upload = jest.fn().mockResolvedValue({
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

  test("shuold create about us successfully", async () => {
    const res = await request(app)
      .post("/api/about-us/aboutUs")
      .field("imageTitles", JSON.stringify([]))
      .field("sections", JSON.stringify([]))
      .attach("image", Buffer.from("fake-image"), "test.jpg");


    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("About us added successfully");
  });
});

//! get about us
describe("shuold get about us successfully", () => {
  test("shuold return 404 if about us not found", async () => {

    const res = await request(app)
    .get("/api/about-us/aboutUs");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("About us not found");

  });

  test("shuold return about us successfully", async () => {
    await request(app)
      .post("/api/about-us/aboutUs")
      .field("imageTitles", JSON.stringify([]))
      .field("sections", JSON.stringify([]))
      .attach("image", Buffer.from("fake-image"), "test.jpg");

    const res = await request(app)
    .get("/api/about-us/aboutUs");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("image");
  });
});

//! update about us

describe("shuodl update about us Successfully", () => {
  test("shuold return 404 if about us not found", async () => {
    const res = await request(app)
    .put("/api/about-us/aboutUs")
    .field("imageTitles", JSON.stringify([]));

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("About us not found");
  });

  test("shuold update about us withput image", async () => {
    await request(app)
      .post("/api/about-us/aboutUs")
      .field("imageTitles", JSON.stringify([]))
      .field("sections", JSON.stringify([]))
      .attach("image", Buffer.from("fake-image"), "test.jpg");

    const res = await request(app)
    .put("/api/about-us/aboutUs")
    .field("imageTitles", JSON.stringify([]));

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("About us updated successfully");
  });


  test("shuold update about us with new image", async () => {
    await request(app)
      .post("/api/about-us/aboutUs")
      .field("imageTitles", JSON.stringify([]))
      .field("sections", JSON.stringify([]))
      .attach("image", Buffer.from("fake-image"), "test.jpg");

    const res = await request(app)
    .put("/api/about-us/aboutUs")
    .field("imageTitles", JSON.stringify([]))
    .attach("image", Buffer.from("fake-image"), "test.jpg");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("About us updated successfully");
  });

});

