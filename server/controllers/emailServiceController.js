import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    if (!process.env.SENDINGBLUE_BREVO_API_KEY || !process.env.SENDINGBLUE_BERVO_EMAIL_USER) {
      throw new Error("Missing email credentials");
    }

    // Configure client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINGBLUE_BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Prepare email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
      to: [{ email: process.env.SENDINGBLUE_BERVO_EMAIL_USER }],
      sender: { email: process.env.SENDINGBLUE_BERVO_EMAIL_USER, name: "Website Contact" },
      replyTo: { email: email },
      subject: `New message from ${name}`,
      textContent: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `,
    });

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully via Sendinblue");
    return { success: true };

  } catch (error) {
    console.error("❌ Sendinblue email error:", error.response?.body || error.message);
    throw error;
  }
};

export default sendHotmailEmail;
