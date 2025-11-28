import express from "express";
import { createReview, getReviews } from "../controllers/reviewsController.js";
import multer from "multer";
import {userMiddleware} from "../middleware/userMiddleware.js"



const storage = multer.diskStorage({});
export const upload = multer({ storage });


const router = express.Router();

router.post("/addReview", userMiddleware, upload.single("image"), createReview);
router.get("/getReviews", getReviews);


export default router