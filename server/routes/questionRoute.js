import express from "express";
import { createQuestion, deleteAllQuestions, deleteSingleQuestion, getAllQuestions, getSingleQuestion } from "../controllers/questionController.js";


const router = express.Router();


router.post("/addQuestion", createQuestion);
router.get("/getAllQuestions", getAllQuestions);
router.get("/getSingleQuestion/:id", getSingleQuestion);
router.delete("/deleteSingleQuestion/:id", deleteSingleQuestion);
router.delete("/deleteAllQuestions", deleteAllQuestions);


export default router;