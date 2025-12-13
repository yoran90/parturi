import express from "express";
import path from "path";
import { deleteGalleryImage, deleteMediaById, getGalleriImages, getMediaList, uploadGalleriImage, uploadMedia } from "../controllers/mediaController.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";




const router = express.Router();

//! cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "paturi",
    resource_type: "auto",
  },
})



const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadMedia);
router.get("/list", getMediaList);
router.delete("/delete/:id", deleteMediaById);

/* gallery route */
router.post("/gallery", upload.array("images"), uploadGalleriImage);
router.get("/galleryImages", getGalleriImages);
router.delete("/deleteGalleryImage", deleteGalleryImage);

export default router;

