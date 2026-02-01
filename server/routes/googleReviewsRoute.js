import express from 'express';
import { getGoogleReviews } from '../controllers/googleReviewsController.js';


const router = express.Router();

router.get('/get-google-reviews', getGoogleReviews);


export default router;