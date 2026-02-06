import sgMail from "@sendgrid/mail";

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    // Check environment variables
    if (!process.env.SENDGRID_EMAIL_USER || !process.env.SENDGRID_API_KEY) {
      throw new Error("Missing email credentials");
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email options
    const msg = {
      to: process.env.SENDGRID_EMAIL_USER,      
      from: process.env.SENDGRID_EMAIL_USER,    
      replyTo: email,                            
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `,
    };

    // Send email
    await sgMail.send(msg);
    console.log("✅ Email sent successfully");

    return { success: true };

  } catch (error) {
    console.error("❌ Email send error:", error);
    throw error;
  }
};
