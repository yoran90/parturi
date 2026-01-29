import nodemailer from "nodemailer";

export const sendJobApplicationEmail = async ({ firstName, lastName, email, phone, selectJob, startDate, resume, message }) => {

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Uusi työhakemus käyttäjältä ➖ (${firstName} ${lastName})`,
      html: `
        <h2>Uusi työhakemus käyttäjältä (${firstName} ${lastName})</h2>
        <p><strong> 👤 Nimi:</strong>  ${firstName} ${lastName}</p>
        <p><strong> 📞 Puhelin:</strong>  ${phone}</p>
        <p><strong> 📧 Sähköposti:</strong>  ${email}</p>
        <p><strong> 💼 Haettu tehtävä:</strong>  ${selectJob}</p>
        <p><strong> 📆 Aloituspäivämäärä:</strong>  ${startDate}</p><br>
        <p><strong> 📜 Viesti:</strong><br><br>${message}</p>
      `,
      attachments: resume ? [
        {
          filename: resume.originalname,
          content: resume.buffer,
          contentType: resume.mimetype
        }
      ] : []
    };

    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    console.log('Form send error', error);
    throw error;
  }

}
