import express from 'express';
import { sendJobApplicationEmail } from '../controllers/jobApplicationController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/apply-job', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, email, phone, selectJob, startDate, message } = req.body;
  const resume = req.file; // multer file

  if (!firstName || !lastName || !email || !phone || !selectJob || !startDate) {
    return res.status(400).json({ message: 'Kaikki kentät ovat pakollisia, jos tähdellä on * se on pakollinen' });
  }

  try {
    await sendJobApplicationEmail({ firstName, lastName, email, phone, selectJob, startDate, resume, message });
    res.status(200).json({ success: true, message: 'Työhakemus lähetetty onnistuneesti' });    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to send job application', error });   
  }
  
});

export default router;
