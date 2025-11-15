import mongoose from "mongoose";


const galleriSchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: true
    },
  ],
}, { timestamps: true});

const Galleri = mongoose.model('Galleri', galleriSchema);
export default Galleri;