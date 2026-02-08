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


export const sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Parturi Website" <${process.env.NODEMAILER_EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.response || error);
    throw new Error("Email could not be sent");
  }
};


export default sendEmail;