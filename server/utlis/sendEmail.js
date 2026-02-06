import SibApiV3Sdk from "sib-api-v3-sdk";

// 1️⃣ Get the default client (connection manager)
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// 2️⃣ Set your API key from .env
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINGBLUE_BREVO_API_KEY;

// 3️⃣ Create email client to send transactional emails
const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * sendEmail - sends a contact form email
 * @param {Object} param0 - contains name, phone, email, message
 */
export const sendEmail = async ({ name, phone, email, message }) => {
  try {
    // Check environment variables
    if (!process.env.SENDINGBLUE_BREVO_API_KEY || !process.env.SENDINGBLUE_BREVO_EMAIL_USER) {
      throw new Error("Missing email credentials");
    }

    // Email payload
    const emailData = {
      to: [{ email: process.env.SENDINGBLUE_BREVO_EMAIL_USER }], // your verified inbox
      sender: { email: process.env.SENDINGBLUE_BREVO_EMAIL_USER, name: "Website Contact" }, // verified sender
      replyTo: { email, name }, // user's email
      subject: `New message from ${name}`,
      textContent: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `,
    };

    // Send email
    const response = await emailClient.sendTransacEmail(emailData);
    console.log("✅ Email sent successfully via Brevo/SendingBlue:", response);

    return { success: true, response };

  } catch (error) {
    console.error("❌ Brevo email error:", error.response?.body || error.message);
    throw error;
  }
};

export default sendEmail;
