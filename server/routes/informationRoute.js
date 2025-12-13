import express from 'express'
import { getInformation, saveInformation } from '../controllers/informationController.js'


const router = express.Router()

router.post("/addInformation", saveInformation);
router.get("/getInformation", getInformation);

export default router