import express from "express";
import { addHeaderLogo, getHeaderLogo } from "../controllers/headerLogoController.js";

import multer from "multer";



const router = express.Router();


//! cloudinary Storage
const storage = multer.diskStorage({});
export const upload = multer({ storage });

router.post('/logo', upload.single("image"), addHeaderLogo);
router.get('/getLogo', getHeaderLogo);



export default router

