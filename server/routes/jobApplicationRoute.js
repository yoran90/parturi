import express from 'express';
import { sendJobApplicationEmail } from '../controllers/jobApplicationController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/job/apply-job
router.post('/apply-job', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, gender, email, phone, selectJob, startDate, message } = req.body;
  const resume = req.file;

  // Validation
  if (!firstName || !lastName || !gender || !email || !phone || !selectJob || !startDate) {
    return res.status(400).json({ 
      success: false, 
      message: 'Kaikki kentät ovat pakollisia, jos tähdellä on * se on pakollinen' 
    });
  }

  try {
    await sendJobApplicationEmail({ firstName, lastName, gender, email, phone, selectJob, startDate, resume, message });
    res.status(200).json({ success: true, message: 'Työhakemus lähetetty onnistuneesti' });
  } catch (error) {
    console.error('Job application email error:', error.response?.body || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send job application', 
      error: error.response?.body || error.message 
    });
  }
});

export default router;
