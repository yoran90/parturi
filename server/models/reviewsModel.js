import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstNmae: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  gender: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true,
    minlength: 5,
  },
  image: {
    url: { type: String, required: false },
    public_id: { type: String, required: false }
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
 /*  likes: {
    count: {
      type: Number,
      default: 0
    },
    likedBy: [
      {
        type: [String],
        default: []
      }
    ]
  },
  comments: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, */
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Reviews = mongoose.model('Reviews', reviewsSchema);
export default Reviews;