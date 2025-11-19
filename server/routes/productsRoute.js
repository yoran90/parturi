import express from "express";
import { addProducts, deleteProductBYId, getAllProducts, getProductById, updateProductById } from "../controllers/productsController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";



const router = express.Router();


//! cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "paturi",
    resource_type: "auto",
  },
})



const upload = multer({ storage: storage });


router.post("/addproduct", upload.array("images"), addProducts);
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProductById);
router.put("/updateProduct/:id", upload.array("images"), updateProductById);
router.delete("/deleteProduct/:id", deleteProductBYId);


export default router