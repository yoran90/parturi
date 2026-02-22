import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notificationModel.js";
import Reviews from "../models/reviewsModel.js";
//import User from "../models/authModel.js";


//! create reviwes
export const createReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;

    if (!reviewText && !rating && !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }


    if (reviewText && reviewText.length < 5) {
      return res.status(400).json({ message: "Review text must be at least 5 characters long" });
    }

    const userId = req.user._id || req.user.id;

    let mediaReview = null;
    if (req.file) {
      const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
        resource_type: fileType === "image" ? "image" : "video",
      });

      mediaReview = {
        type: fileType,
        url: result.secure_url,
        publicId: result.public_id
      };
      
    }


    const review = await Reviews.create({ 
      userId,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage?.url || null,
      gender: req.user.gender,
      reviewText, 
      mediaReview,
      rating 
    });
    res.status(201).json({ message: "Review added successfully", review });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get reviwes
export const getReviews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const reviews = await Reviews.find().sort({ createdAt: -1 });
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }

    if (limit > 0) {
      reviews.splice(limit);
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
} 
//! get review by id 
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Reviews.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! user get all own review
export const getOwnReviews = async (req, res) => {
  try {

    const reviews = await Reviews.find({ userId: req.user._id }).sort({ createdAt: -1 });
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }
    res.status(200).json(reviews);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! user delete own review
export const deleteReviewByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Reviews.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const userIdToCheck = req.user._id || req.user.id;
    if (review.userId.toString() !== userIdToCheck.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (review.mediaReview?.publicId) {
      const resourceType = review.mediaReview.type === "image" ? "image" : "video";
      
      await cloudinary.uploader.destroy(review.mediaReview.publicId, {
        resource_type: resourceType,
      });
    }

    const deleteAllImages = async (comments) => {
      for (const comment of comments) {
        if (comment.imageComment?.public_id) {
          await cloudinary.uploader.destroy(comment.imageComment.public_id);
        }

        if (comment.imageReply?.publicId) {
          await cloudinary.uploader.destroy(comment.imageReply.publicId);
        }

        if (comment.replies && comment.replies.length > 0) {
          await deleteAllImages(comment.replies);
        }
      }
    };

    if (review.comments && review.comments.length > 0) {
      await deleteAllImages(review.comments);
    }

    await Reviews.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! user update own review
export const userUpdateOwnReview = async (req, res) => {
  try {
    const { id } = req.params;
    const {reviewText, rating } = req.body;

    const review = await Reviews.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const userId = req.user._id || req.user.id;
    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (reviewText !== undefined) {
      review.reviewText = reviewText;
    }
    if (rating !== undefined) {
      review.rating = rating;
    }
    if (req.file) {
      if (review.mediaReview?.publicId) {
        await cloudinary.uploader.destroy(review.mediaReview.publicId);
      }
      const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
        resource_type: fileType === "image" ? "image" : "video",
      });
      review.mediaReview = {
        type: fileType,
        url: result.secure_url,
        publicId: result.public_id
      }
    }

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const deleteImageFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.log("Cloudinary delete error:", err);
  }
};

//! admin get review by id and delete
export const getReviewByIdAndDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Reviews.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
   
    if (review.mediaReview?.publicId) {
      const resourceType = review.mediaReview.type === "image" ? "image" : "video";
      
      await cloudinary.uploader.destroy(review.mediaReview.publicId, {
        resource_type: resourceType,
      });
    }


    const deleteCommentImages = async (comments) => {
      for (let c of comments) {
        
        // delete comment image
        if (c.imageComment?.public_id) {
          await cloudinary.uploader.destroy(c.imageComment.public_id);
        }

        // delete replies images recursively
        const deleteReplies = async (replies) => {
          for (let r of replies) {
            if (r.imageReply?.publicId) {
              await deleteImageFromCloudinary(r.imageReply.publicId);
            }
            if (Array.isArray(r.replies) && r.replies.length > 0) {
              await deleteReplies(r.replies);
            }
          }
        };

        if (Array.isArray(c.replies) && c.replies.length > 0) {
          await deleteReplies(c.replies);
        }
      }
    };

    await deleteCommentImages(review.comments);
    await Reviews.findByIdAndDelete(id);

    res.status(200).json({ message: "Review deleted successfully" });


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! create comments
export const createComments = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;

    const review = await Reviews.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    let imageComment = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
      });
      imageComment = {
        url: result.secure_url,
        public_id: result.public_id,
      }
    }

    const newComment = {
      userId: userId,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage?.url || null,
      gender: req.user.gender,
      comment,
      imageComment: imageComment,
      replies: []
    };

    review.comments.push(newComment);
    await review.save();

    const savedComment = review.comments[review.comments.length - 1];

    // Only create notification if comment is not by review owner
    if (review.userId.toString() !== userId.toString() && savedComment._id) {
      await Notification.create({
        recipient: review.userId,
        sender: userId,
        type: "comment",
        reviewId: review._id,
        commentId: mongoose.Types.ObjectId(savedComment._id), // ✅ cast to ObjectId
      });
    }



    res.status(201).json({ success: true, message: "Comment added successfully", comment:  review.comments.slice().reverse() }); //-> reverse show the lsat message first

    

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get comments 
export const getComments = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const limit = parseInt(req.query.limit) || 0;

    const review = await Reviews.findById(reviewId)
      .populate("comments.userId", "firstName lastName profileImage gender")
      .populate("comments.replies.userId", "firstName lastName profileImage gender")

    if (!review) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comments = limit > 0 ? review.comments.slice(0, limit) : review.comments;

    res.status(200).json({
      success: true,
      comments
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! create like
export const createLike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Reviews.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const likedIndex = review.likes.likedBy.findIndex(like => like.userId.toString() === userId.toString());
    if (likedIndex !== -1) {
      review.likes.likedBy.splice(likedIndex, 1);
    } else {
      review.likes.likedBy.push({
        userId,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        profileImage: req.user.profileImage?.url || null,
        gender: req.user.gender
      });
    }

    if (likedIndex === -1 && review.userId.toString() !== userId.toString()) {
      await Notification.create({
        recipient: review.userId,
        sender: userId,
        type: "like",
        reviewId: review._id,
      });
    }


    review.likes.count = review.likes.likedBy.length;

    await review.save();
    res.status(200).json({ success: true, message: "Like added successfully", likes: review.likes });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! CREATE REPLY (supports nested replies)
export const createReply = async (req, res) => {
  try {
    const { reviewId, commentId } = req.params;
    const { reply } = req.body;

    const review = await Reviews.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    let imageReply = null;
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
      });
      imageReply = {
        url: upload.secure_url,
        publicId: upload.public_id,
      };
    }

    const newReply = {
      userId: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage?.url || null,
      gender: req.user.gender,
      reply: reply,
      imageReply,
      createdAt: new Date(),
      replies: [] 
    };

    const addReplyToTree = (comments) => {
      for (let c of comments) {

        // Ensure replies always exists
        if (!Array.isArray(c.replies)) {
          c.replies = [];
        }

        // Insert here
        if (c._id?.toString() === commentId) {
          c.replies.push(newReply);

          // Add notification
          if (c.userId.toString() !== req.user._id.toString()) {
            Notification.create({
              recipient: c.userId,
              sender: req.user._id,
              type: "reply",
              reviewId: review._id,
              commentId: c._id,
              replyId: newReply._id,
            });
          }

          return true;
        }

        // Continue deeper into nested replies
        if (c.replies.length > 0) {
          const inserted = addReplyToTree(c.replies);
          if (inserted) return true;
        }
      }
      return false;
    };

    const inserted = addReplyToTree(review.comments);

    if (!inserted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await review.save();

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      review,
    });

  } catch (err) {
    console.log("Reply error:", err);
    res.status(500).json({ message: err.message });
  }
};
