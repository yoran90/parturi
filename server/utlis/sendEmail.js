import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // smtp.gmail.com
  port: parseInt(process.env.SMTP_PORT),  // 465
  secure: true,                       // true for 465
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});


export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Parturi Website" <${process.env.NODEMAILER_EMAIL_USER}>`,
      to: process.env.NODEMAILER_EMAIL_USER, ,
  subject: `Hi ${firstName}, verify your email!`,
  html: `
    <h1>Welcome ${firstName}!</h1>
    <p>Click the link below to verify your email:</p>
    <a href="${verifyURL}">Verify Email</a>
    <p>Thank you for joining Parturi Website!</p>
  `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
}

export default sendEmail;