import SibApiV3Sdk from "sib-api-v3-sdk";

// Configure Brevo client once
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey =
  process.env.SENDINGBLUE_BREVO_API_KEY;

const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendJobApplicationEmail = async ({
  firstName,
  lastName,
  email,
  phone,
  selectJob,
  startDate,
  resume,
  message,
}) => {
  try {
    if (!process.env.SENDINGBLUE_BREVO_API_KEY || !process.env.SENDINGBLUE_BERVO_EMAIL_USER) {
      throw new Error("Missing email credentials");
    }

    const attachments = [];

    // ✅ Handle resume attachment (PDF / DOC / etc)
    if (resume) {
      attachments.push({
        name: resume.originalname,
        content: resume.buffer.toString("base64"),
      });
    }

    const emailData = new SibApiV3Sdk.SendSmtpEmail({
      to: [
        {
          email: process.env.SENDINGBLUE_BERVO_EMAIL_USER,
        },
      ],
      sender: {
        email: process.env.SENDINGBLUE_BERVO_EMAIL_USER,
        name: "Job Application",
      },
      replyTo: {
        email: email,
        name: `${firstName} ${lastName}`,
      },
      subject: `Uusi työhakemus ➖ ${firstName} ${lastName}`,
      htmlContent: `
        <h2>Uusi työhakemus</h2>
        <p><strong>👤 Nimi:</strong> ${firstName} ${lastName}</p>
        <p><strong>📞 Puhelin:</strong> ${phone}</p>
        <p><strong>📧 Sähköposti:</strong> ${email}</p>
        <p><strong>💼 Haettu tehtävä:</strong> ${selectJob}</p>
        <p><strong>📆 Aloituspäivämäärä:</strong> ${startDate}</p>
        <br />
        <p><strong>📜 Viesti:</strong></p>
        <p>${message}</p>
      `,
      attachment: attachments,
    });

    await emailClient.sendTransacEmail(emailData);

    console.log("✅ Job application email sent via Brevo");
    return { success: true };

  } catch (error) {
    console.error(
      "❌ Brevo job application error:",
      error.response?.body || error.message
    );
    throw error;
  }
};

export default sendJobApplicationEmail;
