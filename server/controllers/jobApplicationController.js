import { sendEmail } from "../utlis/sendEmail.js";

export const sendJobApplicationEmail = async ({
  firstName,
  lastName,
  gender,
  email,
  phone,
  selectJob,
  startDate,
  resume,
  message
}) => {
  try {
    const htmlContent = `
      <h2>Uusi työhakemus käyttäjältä (${firstName} ${lastName})</h2>
      <p><strong>👤 Nimi:</strong> ${firstName} ${lastName}</p>
      <p><strong>♂️ Sukupuoli:</strong> ${gender}</p>
      <p><strong>📞 Puhelin:</strong> ${phone}</p>
      <p><strong>📧 Sähköposti:</strong> ${email}</p>
      <p><strong>💼 Haettu tehtävä:</strong> ${selectJob}</p>
      <p><strong>📆 Aloituspäivämäärä:</strong> ${startDate}</p>
      <p><strong>📜 Viesti:</strong><br>${message || "(ei viestiä)"}</p>
    `;

    let attachment = null;
    if (resume && resume.buffer) {
      const base64Content = resume.buffer.toString('base64');
      attachment = {
        name: resume.originalname,
        content: base64Content
      };
    }

    await sendEmail({
      to: process.env.SENDINBLUE_SENDER_EMAIL,
      subject: `Uusi työhakemus käyttäjältä ${firstName} ${lastName}`,
      htmlContent,
      attachment
    });

    return { success: true };
  } catch (error) {
    console.error("Job Application Email Error:", error.message || error);
    throw error;
  }
};
