import mongoose from 'mongoose';


const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
  }

}, { timestamps: true});

const Media = mongoose.model('Media', mediaSchema);

export default Media;