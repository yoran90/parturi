import SibApiV3Sdk from "sib-api-v3-sdk";

// Step 1: Get the single global ApiClient instance
const client = SibApiV3Sdk.ApiClient.instance;

// Step 2: Attach API key (this MUST happen before sending any emails)
client.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;

// Step 3: Verify the key loaded (REMOVE after testing)
console.log(
  "BREVO API KEY LOADED:",
  typeof client.authentications["api-key"].apiKey === "string" &&
  client.authentications["api-key"].apiKey.startsWith("xkeysib-")
);

// Step 4: Create transactional email API instance
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send contact form email
 */
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

    console.log("Email sent successfully:", response);
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

















/* import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Website Contact" <${process.env.NODEMAILER_EMAIL_USER}>`,
      to: process.env.NODEMAILER_EMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw error;
  }
};
 */