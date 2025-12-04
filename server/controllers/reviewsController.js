
import cloudinary from "../config/cloudinary.js";
import Reviews from "../models/reviewsModel.js";
//import User from "../models/authModel.js";


//! create reviwes
export const createReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;

    if (!reviewText && !rating && !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user.id;

    let image = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
      });
      image = {
        url: result.secure_url,
        publicId: result.public_id,
      }
    }


    const review = await Reviews.create({ 
      userId,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage?.url || null,
      gender: req.user.gender,
      reviewText, 
      image,
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
        publicId: result.public_id,
      }
    }

    const newComment = {
      userId: userId,
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
