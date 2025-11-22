import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: { 
        type: String, 
        required: true 
      },
      publicId: { 
        type: String, 
        required: true 
      }
    }
  ],
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,  
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;