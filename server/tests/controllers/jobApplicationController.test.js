import { jest, describe, test, beforeEach, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import multer from "multer";

// -------------------- MOCK NODEMAILER --------------------
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

import nodemailer from 'nodemailer';
import jobRouter from '../../routes/jobApplicationRoutes.js'; // your router

// Create the sendMail mock AFTER importing nodemailer
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

// -------------------- SETUP EXPRESS APP --------------------
const app = express();
app.use(express.json());
app.use('/api/job', jobRouter);

// -------------------- TEST SUITE --------------------
describe("Job Application Controller", () => {

  beforeEach(() => {
    sendMailMock.mockReset(); // reset mocks before each test
  });

  // -------------------- Missing fields --------------------
  test("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/job/apply-job").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/pakollisia/i); // "required fields" message
  });

  // -------------------- Send email without resume --------------------
  test("should send email successfully without resume", async () => {
    sendMailMock.mockResolvedValueOnce('Email Sent');

    const payload = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+123456789",
      selectJob: "Kokoaikainen",
      startDate: "2026-01-25",
      message: "Hello",
    };

    const res = await request(app).post("/api/job/apply-job").send(payload);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(sendMailMock).toHaveBeenCalled();

    // Check that no attachments were sent
    const mailOptions = sendMailMock.mock.calls[0][0];
    expect(mailOptions.attachments).toHaveLength(0);
  });

  // -------------------- Send email with resume --------------------
  test("should send email successfully with resume", async () => {
    sendMailMock.mockResolvedValueOnce('Email Sent');

    const res = await request(app)
      .post("/api/job/apply-job")
      .attach("resume", Buffer.from("Resume Content"), "resume.pdf")
      .field("firstName", "John")
      .field("lastName", "Doe")
      .field("email", "john@example.com")
      .field("phone", "+123456789")
      .field("selectJob", "Kokoaikainen")
      .field("startDate", "2026-01-25")
      .field("message", "Hello");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Check that attachment is correct
    const mailOptions = sendMailMock.mock.calls[0][0];
    expect(mailOptions.attachments).toHaveLength(1);
    expect(mailOptions.attachments[0].filename).toBe("resume.pdf");
    expect(mailOptions.attachments[0].content.toString()).toBe("Resume Content");
  });

  // -------------------- Nodemailer failure --------------------
  test("should return 500 if nodemailer fails", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("SMTP Error"));

    const payload = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "+123456789",
      selectJob: "Osa-aikainen",
      startDate: "2026-01-25",
      message: "Hi there",
    };

    const res = await request(app).post("/api/job/apply-job").send(payload);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Failed/i);
  });

});
