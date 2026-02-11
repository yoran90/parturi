import SibApiV3Sdk from 'sib-api-v3-sdk';

/**
 * STEP 1: Get the single global API client instance
 */
const client = SibApiV3Sdk.ApiClient.instance;

/**
 * STEP 2: Attach API key in default headers (CRITICAL - most reliable method)
 * This must run BEFORE any email is sent
 */
client.defaultHeaders = client.defaultHeaders || {};
client.defaultHeaders['api-key'] = process.env.SENDINBLUE_API_KEY;

/**
 * STEP 3: Log once to confirm key is loaded (remove after test)
 */
console.log(
  'BREVO API KEY LOADED:',
  !!process.env.SENDINBLUE_API_KEY && 
  process.env.SENDINBLUE_API_KEY.startsWith('xkeysib-')
);

/**
 * STEP 4: Create transactional email API ONCE
 */
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * STEP 5: Export sendEmail function
 */
export const sendEmail = async ({ to, subject, htmlContent }) => {
  if (!to || !subject || !htmlContent) {
    throw new Error('Missing email parameters');
  }

  try {
    return await emailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDINBLUE_SENDER_EMAIL,
        name: process.env.SENDINBLUE_SENDER_NAME,
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    });
  } catch (error) {
    console.error(
      'Sendinblue error:',
      error.response?.text || error.response?.body || error.message || error
    );
    throw new Error('Failed to send email: ' + (error.message || 'Unknown error'));
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