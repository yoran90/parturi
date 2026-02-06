import nodemailer from "nodemailer";

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email credentials");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}

        Message:
        ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    console.error("❌ Email send error:", error.message);
    throw error;
  }
};
