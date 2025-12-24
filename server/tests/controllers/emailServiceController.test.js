import { jest, describe, test, expect } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("nodemailer", () => ({
  default: {
    createTransport: jest.fn(),
  },
}));


const nodemailer = (await import("nodemailer")).default;
const app = (await import("../../app.js")).default;

const sendMailMock  = jest.fn();

nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

describe("Email Service Controller", () => {
  test("shuold return 400 if fields are missing", async () => {
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
    sendMailMock.mockResolvedValueOnce({});

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
    sendMailMock.mockRejectedValueOnce(new Error("SMTP error"));

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