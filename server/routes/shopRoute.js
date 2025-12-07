import express from 'express'
import { createShopMedia, getShopMedia } from '../controllers/shopController.js';
import { authMiddleware } from '../controllers/authController.js';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../config/cloudinary.js';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "paturi",
    resource_type: "auto",
  },
})

const upload = multer({ storage: storage });  


const router = express.Router();

router.post("/createShopeMedia", authMiddleware, upload.array("shopMedia"), createShopMedia);
router.get("/getShopMedia", getShopMedia);
export default router

