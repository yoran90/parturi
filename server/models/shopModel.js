import mongoose from "mongoose";


const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
  },
  src: {
    type: String,
  },
  publicId: {
    type: String
  }
})


const shopSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  media: [mediaSchema],
  
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;