import SibApiV3Sdk from 'sib-api-v3-sdk';


/* if (!process.env.SENDINBLUE_API_KEY) {
  console.error('ERROR: SENDINBLUE_API_KEY environment variable is not set!');
} */

const getConfiguredClient = () => {
  const apiKey = process.env.SENDINBLUE_API_KEY;
  
  if (!apiKey) {
    throw new Error('SENDINBLUE_API_KEY is not configured');
  }
  
  const client = SibApiV3Sdk.ApiClient.instance;
  
  if (client.authentications && client.authentications['api-key']) {
    client.authentications['api-key'].apiKey = apiKey;
  }
  
  client.defaultHeaders = client.defaultHeaders || {};
  client.defaultHeaders['api-key'] = apiKey;
  
  return client;
};


console.log(
  'BREVO API KEY LOADED:',
  !!process.env.SENDINBLUE_API_KEY && 
  process.env.SENDINBLUE_API_KEY.startsWith('xkeysib-'),
  '| Sender Email:',
  process.env.SENDINBLUE_SENDER_EMAIL
);


const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();


export const sendEmail = async ({ to, subject, htmlContent, attachment = null }) => {
  if (!to || !subject || !htmlContent) {
    throw new Error('Missing email parameters: to, subject, htmlContent');
  }

  
  const senderEmail = process.env.SENDINBLUE_SENDER_EMAIL;
  const senderName = process.env.SENDINBLUE_SENDER_NAME || 'Website Contact';
  
  if (!senderEmail) {
    throw new Error('SENDINBLUE_SENDER_EMAIL is not configured in environment variables');
  }

  try {
    
    getConfiguredClient();
    
    const emailConfig = {
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    };
    
    if (attachment) {
      emailConfig.attachment = [
        {
          name: attachment.name,
          content: attachment.content // base64 encoded string
        }
      ];
    }
    
    return await emailApi.sendTransacEmail(emailConfig);
  } catch (error) {
    console.error(
      'Sendinblue error:',
      error.response?.text || error.response?.body || error.message || error
    );
    if (process.env.NODE_ENV !== 'test') {
      console.error(
        'Sendinblue error:',
        error.response?.text || error.response?.body || error.message || error
      );
    }
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