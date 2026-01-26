import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

// 🔹 mock controller BEFORE import
const sendMailMock = jest.fn();

jest.unstable_mockModule(
  "../../controllers/jobApplicationController.js",
  () => ({
    sendJobApplicationEmail: sendMailMock
  })
);

// 🔹 import AFTER mock
const jobApplicationRouter = (
  await import("../../routes/jobApplicationRoute.js")
).default;

describe("POST /apply-job", () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use("/", jobApplicationRouter);
  });

  it("should return 200 and call sendJobApplicationEmail", async () => {
    sendMailMock.mockResolvedValue();

    const res = await request(app)
      .post("/apply-job")
      .field("firstName", "John")
      .field("lastName", "Doe")
      .field("email", "john@test.com")
      .field("phone", "123456")
      .field("selectJob", "Barber")
      .field("startDate", "2026-02-01")
      .field("message", "Hello")
      .attach(
        "resume",
        Buffer.from("fake-pdf"),
        { filename: "cv.pdf", contentType: "application/pdf" }
      );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        resume: expect.objectContaining({
          originalname: "cv.pdf"
        })
      })
    );
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/apply-job")
      .field("firstName", "John");

    expect(res.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("should return 500 if email sending fails", async () => {
    sendMailMock.mockRejectedValue(new Error("Email error"));

    const res = await request(app)
      .post("/apply-job")
      .field("firstName", "John")
      .field("lastName", "Doe")
      .field("email", "john@test.com")
      .field("phone", "123456")
      .field("selectJob", "Barber")
      .field("startDate", "2026-02-01");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
