import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    // Check env
    if (!process.env.SENDINGBLUE_BERVO_EMAIL_USER || !process.env.SENDINGBLUE_BREVO_API_KEY) {
      throw new Error("Missing email credentials");
    }

    // Set API key
    sgMail.setApiKey(process.env.SENDINGBLUE_BREVO_API_KEY);

    // Email message
    const msg = {
      to: process.env.SENDINGBLUE_BERVO_EMAIL_USER, // your inbox
      from: process.env.SENDINGBLUE_BERVO_EMAIL_USER, // same verified sender
      replyTo: email, // user's email
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully via SendGrid");

    return { success: true };
  } catch (error) {
    console.error("❌ SendGrid email error:", error.response?.body || error.message);
    throw error;
  }
};
