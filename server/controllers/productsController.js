import Product from "../models/ProductsModel.js";
import cloudinary from "../config/cloudinary.js";


//! create product
export const addProducts = async (req, res) => {
  try {
    const { title, description, price, discount } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No product images uploaded" });
    }

    const images = req.files.map(file => ({
      url: file.path,        // Cloudinary URL
      publicId: file.filename
    }));
    
    const newProduct = await Product.create({ title, description, images, price, discount });
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
    const { title, description, images, price, discount } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let existingImgArray = [];
     try {
      existingImgArray = JSON.parse(existingImages || "[]");
    } catch (error) {
      console.log("Failed to parse existingImages", error);
    }

    const updateImageList = product.images.filter((img) =>
      existingImgArray.includes(img.url)
    );

    const imagesToDelete = product.images.filter((img) =>
      !existingImgArray.includes(img.url)
    );

    for (const img of imagesToDelete) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));
      updateImageList.push(...newImages);
    }

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, images: updateImageList, price, discount },
      { new: true }
    );
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

    for (const img of deletedProduct.images || []) {
     
      await cloudinary.uploader.destroy(img.publicId);

    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully ✅", product: deletedProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}