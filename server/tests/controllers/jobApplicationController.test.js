import { jest } from "@jest/globals";

const sendEmailMock = jest.fn();

jest.unstable_mockModule("../../utlis/sendEmail.js", () => ({
  __esModule: true,
  sendEmail: sendEmailMock,
  default: sendEmailMock
}));


const { sendJobApplicationEmail } = await import(
  "../../controllers/jobApplicationController.js"
);

describe("sendJobApplicationEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.SENDINBLUE_SENDER_EMAIL = "test@example.com";
    process.env.SENDINBLUE_SENDER_NAME = "Test Sender";
  });

  it("should send email with resume attachment", async () => {
    sendEmailMock.mockResolvedValue({ messageId: "12345" });

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


    expect(sendEmailMock).toHaveBeenCalledTimes(1);

    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: process.env.SENDINBLUE_SENDER_EMAIL,
        subject: `Uusi työhakemus käyttäjältä ${data.firstName} ${data.lastName}`,
        htmlContent: expect.any(String),
        attachment: expect.objectContaining({
          name: "cv.pdf",
          content: Buffer.from("fake-pdf").toString("base64")
        })
      })
    );

  
    expect(result).toEqual({ success: true });
  });

  it("should send email WITHOUT resume", async () => {
    sendEmailMock.mockResolvedValue({ messageId: "67890" });

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

    const result = await sendJobApplicationEmail(data);

    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        attachment: null
      })
    );

    expect(result).toEqual({ success: true });
  });

  it("should throw error if sendEmail fails", async () => {
    sendEmailMock.mockRejectedValue(new Error("Sendinblue API failed"));

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
      .toThrow("Sendinblue API failed");
  });
});