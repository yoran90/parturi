import SibApiV3Sdk from "sib-api-v3-sdk";

// Configure Sendinblue client
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    const response = await emailApi.sendTransacEmail({
      sender: {
        name: process.env.SENDINBLUE_SENDER_NAME,
        email: process.env.SENDINBLUE_SENDER_EMAIL,
      },
      to: [
        { email: process.env.SENDINBLUE_SENDER_EMAIL } // you will receive email here
      ],
      replyTo: {
        email: email,
        name: name,
      },
      subject: `New message from ${name}`,
      htmlContent: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("Email sent via Sendinblue:", response);
    return response;
  } catch (error) {
    console.error("Sendinblue error:", error);
    throw new Error("Failed to send email");
  }
};


















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