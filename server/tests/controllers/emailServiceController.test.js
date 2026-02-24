import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import request from "supertest";

// Mock sib-api-v3-sdk instead of nodemailer
const sendTransacEmailMock = jest.fn();

jest.unstable_mockModule("sib-api-v3-sdk", () => ({
  default: {
    ApiClient: {
      instance: {
        authentications: {
          "api-key": {},
        },
      },
    },
    TransactionalEmailsApi: jest.fn().mockImplementation(() => ({
      sendTransacEmail: sendTransacEmailMock,
    })),
  },
}));

const app = (await import("../../app.js")).default;

describe("Email Service Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if fields are missing", async () => {
    const res = await request(app)
      .post("/api/email/send-email")
      .send({
        name: "John",
        email: "test@test.com",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  test("should send email successfully", async () => {
    sendTransacEmailMock.mockResolvedValueOnce({});

    const res = await request(app).post("/api/email/send-email").send({
      name: "John",
      phone: "123456",
      email: "test@test.com",
      message: "Hello",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Email sent successfully");
  });

  test("should return 500 if email fails", async () => {
    sendTransacEmailMock.mockRejectedValueOnce(
      new Error("Sendinblue error")
    );

    const res = await request(app)
      .post("/api/email/send-email")
      .send({
        name: "John",
        phone: "1234567890",
        email: "test@test.com",
        message: "Test Message",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Failed to send email");
  });
});