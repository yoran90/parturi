import { sendEmail } from "../utlis/sendEmail.js";

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
    // ✅ Build HTML content
    const htmlContent = `
      <h2>Uusi työhakemus käyttäjältä (${firstName} ${lastName})</h2>
      <p><strong>👤 Nimi:</strong> ${firstName} ${lastName}</p>
      <p><strong>📞 Puhelin:</strong> ${phone}</p>
      <p><strong>📧 Sähköposti:</strong> ${email}</p>
      <p><strong>💼 Haettu tehtävä:</strong> ${selectJob}</p>
      <p><strong>📆 Aloituspäivämäärä:</strong> ${startDate}</p>
      <p><strong>📜 Viesti:</strong><br>${message || "(ei viestiä)"}</p>
    `;

    // ✅ Use centralized sendEmail function
    await sendEmail({
      to: process.env.SENDINBLUE_SENDER_EMAIL,
      subject: `Uusi työhakemus käyttäjältä ${firstName} ${lastName}`,
      htmlContent
    });

    return { success: true };
  } catch (error) {
    console.error("Job Application Email Error:", error.message || error);
    throw error;
  }
};
