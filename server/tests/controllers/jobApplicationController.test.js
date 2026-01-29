import { jest } from "@jest/globals";

// 🔹 mock sendMail
const sendMailMock = jest.fn();

// 🔹 mock nodemailer BEFORE importing the function
jest.unstable_mockModule("nodemailer", () => ({
  default: {
    createTransport: jest.fn(() => ({
      sendMail: sendMailMock
    }))
  }
}));

// 🔹 now import AFTER mock
const { sendJobApplicationEmail } = await import(
  "../../controllers/jobApplicationController.js"
);

describe("sendJobApplicationEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.EMAIL_USER = "test@gmail.com";
    process.env.EMAIL_PASSWORD = "password123";
  });

  it("should send email with resume attachment", async () => {
    sendMailMock.mockResolvedValue({ messageId: "12345" });

    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "123456789",
      selectJob: "Backend Developer",
      startDate: "2026-02-01",
      message: "I would love to apply",
      resume: {
        originalname: "cv.pdf",
        buffer: Buffer.from("fake-pdf"),
        mimetype: "application/pdf"
      }
    };

    const result = await sendJobApplicationEmail(data);

    // ✅ sendMail was called
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    // ✅ verify email payload
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: `"John Doe" <john@example.com>`,
        to: process.env.EMAIL_USER,
        subject: "Uusi työhakemus käyttäjältä ➖ (John Doe)",
        attachments: [
          expect.objectContaining({
            filename: "cv.pdf",
            contentType: "application/pdf"
          })
        ]
      })
    );

    // ✅ return value
    expect(result).toEqual({ messageId: "12345" });
  });

  it("should send email WITHOUT resume", async () => {
    sendMailMock.mockResolvedValue({ accepted: ["test@gmail.com"] });

    const data = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "987654321",
      selectJob: "Frontend Developer",
      startDate: "2026-03-01",
      message: "Here is my application",
      resume: null
    };

    await sendJobApplicationEmail(data);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        attachments: []
      })
    );
  });

  it("should throw error if sendMail fails", async () => {
    sendMailMock.mockRejectedValue(new Error("SMTP failed"));

    const data = {
      firstName: "Error",
      lastName: "Case",
      email: "error@test.com",
      phone: "000",
      selectJob: "Tester",
      startDate: "now",
      message: "fail",
      resume: null
    };

    await expect(sendJobApplicationEmail(data))
      .rejects
      .toThrow("SMTP failed");
  });
});
