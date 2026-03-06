import mongoose from "mongoose";


const feedBackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  }
}, { timestamps: true });

const FeedBack = mongoose.model('FeedBack', feedBackSchema);
export default FeedBack;