import sgMail from "@sendgrid/mail";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export const sendEmail = async ({ name, phone, email, message }) => {
  try {
    const msg = {
      to: process.env.SENDGRID_EMAIL_USER, 
      from: process.env.SENDGRID_EMAIL_USER, 
      subject: `New message from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully via SendGrid");
  } catch (error) {
    console.error("❌ SendGrid email error:", error.message);
    throw error;
  }
};

export default sendEmail;