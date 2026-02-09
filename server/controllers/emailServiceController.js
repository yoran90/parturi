import nodemailer from "nodemailer";

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
