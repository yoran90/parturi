import express from "express";
import path from "path";
import multer from "multer";
import { deleteGalleryImage, deleteMediaById, getGalleriImages, getMediaList, uploadGalleriImage, uploadMedia } from "../controllers/mediaController.js";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadMedia);
router.get("/list", getMediaList);
router.delete("/delete/:id", deleteMediaById);

/* gallery route */
router.post("/gallery", upload.array("images"), uploadGalleriImage);
router.get("/galleryImages", getGalleriImages);
router.delete("/deleteGalleryImage", deleteGalleryImage);

export default router;

