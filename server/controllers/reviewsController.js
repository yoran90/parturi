
import cloudinary from "../config/cloudinary.js";
import Reviews from "../models/reviewsModel.js";


//! create reviwes
export const createReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;

    if (!reviewText || !rating) {
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
      firstNmae: req.user.firstName,
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
    const reviews = await Reviews.find();
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
} 