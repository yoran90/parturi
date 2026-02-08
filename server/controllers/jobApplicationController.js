import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINGBLUE_BREVO_API_KEY;

const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();



export const sendJobApplicationEmail = async ({
  firstName,
  lastName,
  email,
  phone,
  selectJob,
  startDate,
  resume,
  message
}) => {
  try {
    // ✅ Set API key at runtime
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey =
      process.env.SENDINGBLUE_BREVO_API_KEY;

    // ✅ Ensure sender is defined
    const senderEmail = process.env.SENDINGBLUE_BREVO_EMAIL_USER;
    if (!senderEmail) {
      throw new Error("Missing sender email. Check your .env in Render!");
    }

    // ✅ Initialize email client
    const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

    // ✅ Build email payload
    const emailData = new SibApiV3Sdk.SendSmtpEmail({
      sender: { email: senderEmail, name: "Website Contact" },
      to: [{ email: senderEmail }],
      replyTo: { email },
      subject: `Uusi työhakemus käyttäjältä ${firstName} ${lastName}`,
      htmlContent: `
        <h2>Uusi työhakemus käyttäjältä (${firstName} ${lastName})</h2>
        <p><strong>👤 Nimi:</strong> ${firstName} ${lastName}</p>
        <p><strong>📞 Puhelin:</strong> ${phone}</p>
        <p><strong>📧 Sähköposti:</strong> ${email}</p>
        <p><strong>💼 Haettu tehtävä:</strong> ${selectJob}</p>
        <p><strong>📆 Aloituspäivämäärä:</strong> ${startDate}</p>
        <p><strong>📜 Viesti:</strong><br>${message || "(ei viestiä)"}</p>
      `,
      attachment: resume
        ? [
            {
              content: resume.buffer.toString("base64"),
              name: resume.originalname,
              type: resume.mimetype,
            },
          ]
        : [],
    });

    // ✅ Send email
    await emailClient.sendTransacEmail(emailData);
    return { success: true };
  } catch (error) {
    console.error("BREVO ERROR:", error.response?.body || error.message || error);
    throw error;
  }
};
