import mongoose from "mongoose";


const shopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  src: {
    type: String,
    required: true
  },
  publicId: {
    type: String
  },
  alt: {
    type: String,
  }
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;