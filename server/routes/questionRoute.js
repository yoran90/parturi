import express from "express";
import { createQuestion, deleteAllQuestions, deleteSingleQuestion, getAllQuestions, getSingleQuestion } from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/addQuestion", createQuestion);
router.get("/getAllQuestions", authMiddleware, getAllQuestions);
router.get("/getSingleQuestion/:id", authMiddleware, getSingleQuestion);
router.delete("/deleteSingleQuestion/:id", authMiddleware, deleteSingleQuestion);
router.delete("/deleteAllQuestions", authMiddleware, deleteAllQuestions);


export default router;