import nodemailer from "nodemailer";



const sendEmail = async (to, subject, text) => {
  const trsansporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await trsansporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

};

export default sendEmail;
