import SibApiV3Sdk from '@sendinblue/client';

// Get API client instance
const apiClient = SibApiV3Sdk.ApiClient.instance;

// Attach API key correctly
apiClient.authentications['api-key'].apiKey =
  process.env.SENDINBLUE_API_KEY;

// Create transactional email API
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ to, subject, htmlContent }) => {
  const sendSmtpEmail = {
    sender: {
      email: process.env.SENDINBLUE_SENDER_EMAIL,
      name: process.env.SENDINBLUE_SENDER_NAME,
    },
    to: [{ email: to }],
    subject,
    htmlContent,
  };

  try {
    const data = await emailApi.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent:', data);
    return data;
  } catch (error) {
    console.error(
      'Sendinblue error:',
      error.response?.text || error.message
    );
    throw error;
  }
};

export default sendEmail;











/* import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});


export const sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Razor parturi" <${process.env.NODEMAILER_EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error.response || error);
    throw new Error("Email could not be sent");
  }
};


export default sendEmail; */