/* import nodemailer from "nodemailer"; */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: to,
      subject, 
      text: text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
  /* const trsansporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await trsansporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  }); */

};

export default sendEmail;
