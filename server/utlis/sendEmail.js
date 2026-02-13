import SibApiV3Sdk from 'sib-api-v3-sdk';

/**
 * STEP 1: Verify API key is available
 */
if (!process.env.SENDINBLUE_API_KEY) {
  console.error('ERROR: SENDINBLUE_API_KEY environment variable is not set!');
}

/**
 * STEP 2: Create a fresh client instance with API key each time
 */
const getConfiguredClient = () => {
  const apiKey = process.env.SENDINBLUE_API_KEY;
  
  if (!apiKey) {
    throw new Error('SENDINBLUE_API_KEY is not configured');
  }
  
  const client = SibApiV3Sdk.ApiClient.instance;
  
  // Method 1: Set in authentications (primary)
  if (client.authentications && client.authentications['api-key']) {
    client.authentications['api-key'].apiKey = apiKey;
  }
  
  // Method 2: Set in default headers (backup)
  client.defaultHeaders = client.defaultHeaders || {};
  client.defaultHeaders['api-key'] = apiKey;
  
  return client;
};

/**
 * STEP 3: Log API key status
 */
console.log(
  'BREVO API KEY LOADED:',
  !!process.env.SENDINBLUE_API_KEY && 
  process.env.SENDINBLUE_API_KEY.startsWith('xkeysib-'),
  '| Sender Email:',
  process.env.SENDINBLUE_SENDER_EMAIL
);

/**
 * STEP 4: Create transactional email API instance
 */
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * STEP 5: Export sendEmail function
 */
export const sendEmail = async ({ to, subject, htmlContent, attachment = null }) => {
  if (!to || !subject || !htmlContent) {
    throw new Error('Missing email parameters: to, subject, htmlContent');
  }

  // Validate sender configuration
  const senderEmail = process.env.SENDINBLUE_SENDER_EMAIL;
  const senderName = process.env.SENDINBLUE_SENDER_NAME || 'Website Contact';
  
  if (!senderEmail) {
    throw new Error('SENDINBLUE_SENDER_EMAIL is not configured in environment variables');
  }

  try {
    // Ensure API key is set before each request
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
    
    // Add attachment if provided (Brevo expects base64 content)
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