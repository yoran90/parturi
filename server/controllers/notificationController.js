import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
  try {
    console.log("Logged in user ID:", req.user._id);
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "firstName lastName profilePicture")
      .populate("reviewId", "reviewText mediaReview")
      .sort({ createdAt: -1 });

      console.log("Notifications found:", notifications);

    res.status(200).json({
      success: true,
      notifications
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