import express from "express";
import multer from "multer";
import { addAboutUs, getAboutUs, updateAboutUs } from "../controllers/aboutUsController.js";


const router = express.Router();


//! cloudinary Storage
const storage = multer.diskStorage({});
export const upload = multer({ storage });

router.post('/aboutUs', upload.single("image"), addAboutUs);
router.get('/aboutUs', getAboutUs);
router.put('/aboutUs', upload.single("image"), updateAboutUs);

export default router;
