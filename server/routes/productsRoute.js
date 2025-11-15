import express from "express";
import { addProducts, deleteProductBYId, getAllProducts, getProductById, updateProductById } from "../controllers/productsController.js";
import multer from "multer";
import path from "path";



const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage: storage });


router.post("/addproduct", upload.array("images"), addProducts);
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProductById);
router.put("/updateProduct/:id", upload.array("images"), updateProductById);
router.delete("/deleteProduct/:id", deleteProductBYId);


export default router