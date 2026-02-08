import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for port 465
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.NODEMAILER_EMAIL_USER}>`, // sender
      to: process.env.NODEMAILER_EMAIL_USER, // your email to receive messages
      replyTo: `${name} <${email}>`, // allows reply to the user's email
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};
