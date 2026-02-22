import mongoose from 'mongoose';


const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  }, 
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "comment", "reply"],
    required: true,
  },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews",
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews",
  },
  isRead: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

notificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 7776000 }  /// 90 days in seconds delete notifications after 90 days
)

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;