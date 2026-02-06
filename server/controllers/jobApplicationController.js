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
    // ✅ Check env variables
    const senderEmail = process.env.SENDINGBLUE_BREVO_EMAIL_USER;
    if (!senderEmail || !process.env.SENDINGBLUE_BREVO_API_KEY) {
      throw new Error("Missing Brevo credentials (sender email or API key)");
    }

    // Build email payload
    const emailData = new SibApiV3Sdk.SendSmtpEmail({
      sender: {
        email: senderEmail,
        name: "Website Contact"
      },
      to: [{ email: senderEmail }], // send to yourself
      replyTo: { email },           // applicant can reply
      subject: `Uusi työhakemus käyttäjältä ${firstName} ${lastName}`,
      htmlContent: `
        <h2>Uusi työhakemus käyttäjältä (${firstName} ${lastName})</h2>
        <p><strong>👤 Nimi:</strong> ${firstName} ${lastName}</p>
        <p><strong>📞 Puhelin:</strong> ${phone}</p>
        <p><strong>📧 Sähköposti:</strong> ${email}</p>
        <p><strong>💼 Haettu tehtävä:</strong> ${selectJob}</p>
        <p><strong>📆 Aloituspäivämäärä:</strong> ${startDate}</p><br>
        <p><strong>📜 Viesti:</strong><br>${message || "(ei viestiä)"}</p>
      `,
      attachment: resume ? [
        {
          content: resume.buffer.toString("base64"),
          name: resume.originalname,
          type: resume.mimetype
        }
      ] : []
    });

    // ✅ Send email
    await emailClient.sendTransacEmail(emailData);
    console.log("✅ Job application email sent via Brevo");

    return { success: true };
  } catch (error) {
    console.error(
      "❌ Brevo job application email error:",
      error.response?.body || error.message
    );
    throw error;
  }
};
