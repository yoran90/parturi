import express from "express";
import { createFeedBack, deleteAllFeedBacks, deleteSingleFeedBack, getAllFeedBacks, getSingleFeedBack } from "../controllers/feedBackController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addFeedback", createFeedBack);
router.get("/getAllFeedbacks", authMiddleware, getAllFeedBacks);
router.get("/getSingleFeedBack", authMiddleware, getSingleFeedBack);
router.delete("/deleteSingleFeedback/:id", authMiddleware, deleteSingleFeedBack);
router.delete("/deleteAllFeedbacks", authMiddleware, deleteAllFeedBacks);

export default router;