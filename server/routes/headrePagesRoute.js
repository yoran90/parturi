import express from "express";
import { createHeaderPages, getHeaderPages, updateHeaderPages } from "../controllers/headerPagesController.js";



const router = express.Router()


router.post("/addHeaderPage", createHeaderPages );
router.put("/updateHeaderPage/:id", updateHeaderPages);
router.get("/getHeaderPages", getHeaderPages);


export default router