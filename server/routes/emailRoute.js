import express from "express";
import { sendHotmailEmail } from "../controllers/emailServiceController.js";


const router = express.Router();

router.post("/send-email", async (req, res) => {
  const {name, phone, email, message} = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendHotmailEmail({ name, phone, email, message });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to send email", error });
  }

});


export default router;