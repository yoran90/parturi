import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  gender: {
    type: String,
  },
  reviewText: {
    type: String,
    required: true,
    minlength: 5
  },
  image: {
    url: String,
    public_id: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  /* LIKES */
  likes: {
    count: { 
      type: Number, 
      default: 0 
    },
    likedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
          required: true
        },
        firstName: { type: String },
        lastName: { type: String },
        profileImage: { type: String },
        gender: { type: String },
        likedAt: { type: Date, default: Date.now }
      }
    ]
  },

  /* COMMENTS + REPLIES (recursive, same style) */
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
      },
      firstName: { type: String },
      lastName: { type: String },
      profileImage: { type: String },
      gender: { type: String },
      comment: { type: String },
      reply: { type: String },
      imageComment: {
        url: String,
        public_id: String
      },
      imageReply: {
        url: String,
        public_id: String
      },
      createdAt: { type: Date, default: Date.now },
      replies: [] 
    }
  ]

}, { timestamps: true });

const Reviews = mongoose.model('Reviews', reviewsSchema);
export default Reviews;


















