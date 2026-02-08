import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey =
  process.env.SENDINGBLUE_BREVO_API_KEY;

const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, text }) => {
  if (!to || !subject || !text) {
    throw new Error("Email payload missing fields");
  }

  const emailData = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: to }],
    sender: {
      email: process.env.SENDINGBLUE_BREVO_EMAIL_USER,
      name: "Parturi Website",
    },
    subject,
    textContent: text,
  });

  await emailClient.sendTransacEmail(emailData);
};

export default sendEmail;
