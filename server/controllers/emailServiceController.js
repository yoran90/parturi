import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = process.env.SENDINGBLUE_BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const emailData = {
    sender: {
      email: process.env.SENDINGBLUE_BERVO_EMAIL_USER,
      name: "Website Contact",
    },
    to: [
      {
        email: process.env.SENDINGBLUE_BERVO_EMAIL_USER,
      },
    ],
    replyTo: {
      email: email,
      name: name,
    },
    subject: `New message from ${name}`,
    textContent: `Name: ${name}
      Phone: ${phone}
      Email: ${email}

      Message:
      ${message}`,
  };

  await apiInstance.sendTransacEmail(emailData);
};

