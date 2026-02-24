import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  if (!name || !phone || !email || !message) {
    throw new Error("All fields are required to send email");
  }

  try {
    const response = await emailApi.sendTransacEmail({
      sender: {
        name: process.env.SENDINBLUE_SENDER_NAME,
        email: process.env.SENDINBLUE_SENDER_EMAIL,
      },
      to: [{ email: process.env.SENDINBLUE_SENDER_EMAIL }],
      replyTo: { email, name },
      subject: `New message from ${name}`,
      htmlContent: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });
    return response;
  } catch (error) {
    console.error(
      "Sendinblue error:",
      error.response?.text || error.response?.body || error.message || error
    );
    throw new Error("Failed to send email: Unauthorized or invalid API key");
  }
};

export default sendHotmailEmail;















