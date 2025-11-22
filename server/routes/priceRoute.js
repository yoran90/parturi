import express from 'express';
import { deletePrice, getPrices, savePrice } from '../controllers/priceController.js';

const router = express.Router();


router.post('/addprice', savePrice);
router.get('/getprices', getPrices);
router.delete('/deleteprice/:id', deletePrice);


export default router;