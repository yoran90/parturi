import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINGBLUE_BREVO_API_KEY;

const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send an email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - email text content
 * @param {string} [replyTo] - optional reply-to email
 */
export const sendEmail = async ({ to, subject, text, replyTo }) => {
  try {
    if (!process.env.SENDINGBLUE_BREVO_API_KEY || !process.env.SENDINGBLUE_BERVO_EMAIL_USER) {
      throw new Error("Missing email credentials");
    }

    const emailData = new SibApiV3Sdk.SendSmtpEmail({
      to: [{ email: to }],
      sender: { email: process.env.SENDINGBLUE_BERVO_EMAIL_USER, name: "Your Website" },
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject,
      textContent: text,
    });

    await emailClient.sendTransacEmail(emailData);

    console.log("✅ Email sent successfully via Sendinblue");
    return { success: true };
  } catch (error) {
    console.error("❌ Sendinblue email error:", error.response?.body || error.message);
    throw error;
  }
};

export default sendEmail;
