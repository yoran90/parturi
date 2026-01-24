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
      subject: `New Job Application from ${firstName} ${lastName}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Position Applied:</strong> ${selectJob}</p>
        <p><strong>Start Date:</strong> ${startDate}</p>
        <p><strong>Message:</strong><br>${message}</p>
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
