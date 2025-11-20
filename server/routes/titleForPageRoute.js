import express from "express";
import { addTitleForPage } from "../controllers/titleForPageController.js";



const router = express.Router();


router.post('/addT-Dforpage', addTitleForPage);



export default router