// tests/controllers/authController.test.js
// ⚠️ TOP: Mock the module before importing anything that uses it
await jest.unstable_mockModule("../../utlis/sendEmail.js", () => ({
  __esModule: true,
  sendEmail: jest.fn().mockResolvedValue(true), // ✅ named export
}));

// Import after mocking
import { sendEmail } from "../../utlis/sendEmail.js";
import request from "supertest";
import app from "../../app.js";
import Auth from "../../models/authModel.js";
import { describe, test, afterEach, expect, jest } from "@jest/globals";

describe("POST /api/auth/register", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user successfully", async () => {
    const fakeUser = {
      _id: "user123",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "hashedPassword",
      generateEmailVerificationToken: jest.fn().mockReturnValue("mockToken123"),
      save: jest.fn().mockResolvedValue(true),
    };

    // Mock DB calls
    jest.spyOn(Auth, "findOne").mockResolvedValue(null);
    jest.spyOn(Auth, "create").mockResolvedValue(fakeUser);

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        email: "john@example.com",
        password: "123456",
      });

    // ✅ Assertions
    expect(fakeUser.generateEmailVerificationToken).toHaveBeenCalled();
    expect(fakeUser.save).toHaveBeenCalled();

    // ⚡ This now works because sendEmail is a mock
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "john@example.com",
        subject: "Email Verification",
        htmlContent: expect.stringContaining("mockToken123"),
      })
    );

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(fakeUser);
  });
});