import { jest, describe, test, beforeEach, expect } from "@jest/globals";
import request from "supertest";


jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: {
    uploader: {
      upload: jest.fn(),
      destroy: jest.fn(),
    },
    config: jest.fn(),
  },
}));

const cloudinary = (await import("../../config/cloudinary.js")).default;
const app = (await import("../../app.js")).default;


//! create and update header logo
describe("Header Logo Controller", () => {

  beforeEach(() => {
    cloudinary.uploader.upload = jest.fn().mockResolvedValue({
      secure_url: "https://fake-cloudinary-image.com/test.jpg",
      public_id: "paturi/logo123",
    });
    cloudinary.uploader.destroy = jest.fn();
  });


  test("shuold return 400 if logo image missing", async () => {
    const res = await request(app)
    .post("/api/header-logo/logo")
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Logo image is required");
  });

  test("shuold create header logo", async () => {
    const res = await request(app)
    .post("/api/header-logo/logo")
    .attach("image", Buffer.from("image"), "logo.jpg");


    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Header logo added successfully");
  });

  test("should update header logo if exists", async () => {
    await request(app)
      .post("/api/header-logo/logo")
      .attach("image", Buffer.from("fake"), "logo.png");

    const res = await request(app)
      .post("/api/header-logo/logo")
      .attach("image", Buffer.from("fake2"), "logo2.png");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Header logo updated successfully");
  });

});


//! Get Header logo
describe("Get Header Logo", () => {
  test("should return 404 if header logo not found", async () => {
    const res = await request(app)
    .get("/api/header-logo/getLogo");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Header logo not found");
  });

  test("should return header logo", async () => {
    await request(app)
      .post("/api/header-logo/logo")
      .attach("image", Buffer.from("fake"), "logo.png");

    const res = await request(app).get("/api/header-logo/getLogo");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("url");
  });

})