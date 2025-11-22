import express from "express";
import { addTitleForPage, getTitleForPage, updateTitleForPage } from "../controllers/titleForPageController.js";



const router = express.Router();


router.post('/addT-Dforpage', addTitleForPage);
router.get('/getT-Dforpage', getTitleForPage);
router.put('/updateT-Dforpage', updateTitleForPage);



export default router