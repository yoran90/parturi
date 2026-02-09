/* import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, 
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

// services/sendHotmailEmail.js
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send contact form email to your own email
 * @param {Object} param0
 * @param {string} param0.name
 * @param {string} param0.phone
 * @param {string} param0.email
 * @param {string} param0.message
 */
export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    const response = await resend.emails.send({
      from: `Website Contact <contact@razorr.fi>`,
      to: ["harun-amin@hotmail.com"],
      reply_to: `${name} <${email}>`,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("📬 Contact form email sent, response:", response);
    return response;
  } catch (error) {
    console.error("❌ Resend sendHotmailEmail error:", error);
    throw new Error("Contact form email could not be sent");
  }
};


export default sendHotmailEmail;
