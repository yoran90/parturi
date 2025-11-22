import mongoose from "mongoose";

const galleriSchema = new mongoose.Schema({
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
}, { timestamps: true });

const Galleri = mongoose.model('Galleri', galleriSchema);
export default Galleri;
