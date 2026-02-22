import Notification from "../models/notificationModel.js";
import Reviews from "../models/reviewsModel.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "firstName lastName profileImage gender")
      .populate("reviewId", "reviewText mediaReview")
      .sort({ createdAt: -1 });

    
    const detailedNotifications = await Promise.all(
      notifications.map(async (notification) => {
        let commentText = null;
        let replyText = null;

        if (notification.commentId) {
          const review = await Reviews.findById(notification.reviewId);
          if (review) {
            const comment = review.comments.id(notification.commentId);
            if (comment) commentText = comment.comment;
            if (notification.replyId && comment.replies) {
              const reply = comment.replies.id(notification.replyId);
              if (reply) replyText = reply.reply;
            }
          }
        }

        return {
          ...notification._doc,
          commentText,
          replyText,
        };
      })
    );

    res.status(200).json({
      success: true,
      notifications: detailedNotifications
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      notification
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};