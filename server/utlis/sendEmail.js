// services/sendEmail.js
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a simple text email
 * @param {Object} param0 
 * @param {string} param0.to - Recipient email
 * @param {string} param0.subject - Email subject
 * @param {string} param0.text - Email body (text)
 */
export const sendEmail = async ({ to, subject, text }) => {
  try {
    const { data } = await resend.emails.send({
      from: `Razor Parturi <contact@razorr.fi>`, // Must be on your verified domain
      to: [to],
      subject,
      html: `<p>${text}</p>`,
    });

    console.log("📬 Email sent via Resend, ID:", data.id);
    return data;
  } catch (error) {
    console.error("❌ Resend sendEmail error:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
