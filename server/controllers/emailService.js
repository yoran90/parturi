import nodemailer from "nodemailer";
import express from "express";


export const sendHotmailEmail = async ({ name, phone, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully',info);
    return info

  } catch (error) {
    console.log('Email send error',error);
    throw error;
  }
  
}