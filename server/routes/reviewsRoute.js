import express from "express";
import { createComments, createLike, createReply, createReview, getComments, getReviews } from "../controllers/reviewsController.js";
import multer from "multer";
import {userMiddleware} from "../middleware/userMiddleware.js"



const storage = multer.diskStorage({});
export const upload = multer({ storage });


const router = express.Router();

router.post("/addReview", userMiddleware, upload.single("image"), createReview);
router.get("/getReviews", getReviews);
router.post("/:reviewId/addComment", userMiddleware, upload.single("imageComment"), createComments);
router.get("/:reviewId/getComments", getComments);
router.post("/:reviewId/like", userMiddleware, createLike);
router.post("/:reviewId/comments/:commentId/reply", userMiddleware, upload.single("imageReply"), createReply);


export default router