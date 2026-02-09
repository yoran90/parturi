import express from "express";
import { sendHotmailEmail } from "../controllers/emailServiceController.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { name, phone, email, message } = req.body;

  console.log("📧 Email request received:", { name, email }); // Add logging

  if (!name || !phone || !email || !message) {
    console.log("❌ Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("Request body:", req.body);
    await sendHotmailEmail({ name, phone, email, message });
     console.log("✅ Email sent successfully");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
});

export default router;
