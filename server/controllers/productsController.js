import Product from "../models/Products.js";
import fs from "fs";
import path from "path";

//! create product
export const addProducts = async (req, res) => {
  try {
    const { title, description, images, price, discount } = req.body;

    const imagePath = req.files.map(file => file.path);
    
    const newProduct = await Product.create({ title, description, images: imagePath, price, discount });
    const saveProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully ✅", product: saveProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get all products 
export const getAllProducts = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit) || 0;

    const getProducts = await Product.find().sort({ createdAt: -1 }).limit(limit);
    res.status(200).json(getProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! update producta by id
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, discount } = req.body;

    let images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);

      const oldProduct = await Product.findById(id);
      if (oldProduct && oldProduct.images) {
        oldProduct.images.forEach(imagePath => {
          const fullPath = path.join(process.cwd(), imagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      } else {
        const exsistingProduct = await Product.findById(id);
        images = exsistingProduct.images;
      }
    }

    const updateProduct = await Product.findByIdAndUpdate(id, { title, description, images, price, discount }, { new: true });
    res.status(200).json({ message: "Product updated successfully ✅", product: updateProduct });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! delelete product by id
export const deleteProductBYId = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findById(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (deletedProduct.images && deletedProduct.images.length > 0) {
      deletedProduct.images.forEach(imagePath => {
        const fullPath = path.join(process.cwd(), imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully ✅", product: deletedProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}