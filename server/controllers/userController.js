import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";


import Reviews from "../models/reviewsModel.js";
import mongoose from "mongoose";
import sendEmail from "../utlis/sendEmail.js";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);




//! user login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkUser = await Auth.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!checkUser.isEmailVerified) {
      return res.status(401).json({ message: "Please verify your email before logging in" });
    }

    const correctPassword = await bcrypt.compare(password, checkUser.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({
      id: checkUser._id,
      favoriteName: checkUser.favoriteName,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      gender: checkUser.gender,
      profileImage: checkUser.profileImage,
      email: checkUser.email,
      role: checkUser.role,
      bio: checkUser.bio,
      addressOne: checkUser.addressOne,
      addressTwo: checkUser.addressTwo,
      country: checkUser.country,
      city: checkUser.city,
      postalCode: checkUser.postalCode,
      phoneNumber: checkUser.phoneNumber,
      notes: checkUser.notes,
      timezone: checkUser.timezone
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    /* const cookie = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie("userToken", token, cookie); */
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: true,      
      sameSite: "None",  
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ 
      success: true, 
      message: "User logged in successfully", 
      token,
      user: {
        id: checkUser._id,
        favoriteName: checkUser.favoriteName,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        gender: checkUser.gender,
        profileImage: checkUser.profileImage,
        email: checkUser.email,
        role: checkUser.role,
        bio: checkUser.bio,
        addressOne: checkUser.addressOne,
        addressTwo: checkUser.addressTwo,
        country: checkUser.country,
        city: checkUser.city,
        postalCode: checkUser.postalCode,
        phoneNumber: checkUser.phoneNumber,
        notes: checkUser.notes,
        timezone: checkUser.timezone
      }
  });

  } catch (error) {
    console.log();
    res.status(500).json({ message: error.message });
  }
}

//! user google login
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ message: "Credential is required" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, family_name, picture } = payload;

    let user = await Auth.findOne({ email });

    if (!user) {
      user = await Auth({
        firstName: name,
        lastName: family_name,
        email: email,
        isEmailVerified: true,
        profileImage: { url: picture },
        role: "user",
        password: crypto.randomBytes(20).toString("hex"),
        gender: "Not specified",
      });
    }

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.family_name,
        profileImage: user.profileImage,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d"}
    );

    const cookie = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie("userToken", token, cookie);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! user forget password
export const userForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetToken = user.generatePasswordReset();
    await user.save();

    // Create URL for reset password (frontend URL)
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      htmlContent: `<p>Ignore if you don't want to reset password.</p><p>If you want to reset your password, click the below link ⬇️</p><a href="${resetURL}">Reset Password</a>`,
    });

    res.json({ message: "Password reset link sent to email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


//! user reset password
export const userResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }


    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // find user by token and expiration resetPasswordToken and resetPasswordExpires from Auth model
    const user = await Auth.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired password reset token" });
    }

    // now hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful ✅ Please login with your new password" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! user send verify email again
export const sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: "Email is already verified" });
    }

    // Generate token using Auth model
    const token = user.generateEmailVerificationToken();
    await user.save();

    // Create URL for email verification (frontend URL)
    const verifyURL = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      htmlContent: `Click the below link to verify your email ⬇️<br><br><a href="${verifyURL}">Verify Email</a>`,
    });

    res.status(200).json({ success: true, message: "Verification email sent. Please check your email." });


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Auth.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
//! GET PROFILE USER BY ID
export const getProfileUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Auth.findById(id).select("-password -notes");
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! update own user by id
export const userUpdateOwnData = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await Auth.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.favoriteName = req.body.favoriteName;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.bio = req.body.bio;
    user.addressOne = req.body.addressOne;
    user.addressTwo = req.body.addressTwo;
    user.country = req.body.country;
    user.city = req.body.city;
    user.postalCode = req.body.postalCode;
    user.phoneNumber = req.body.phoneNumber;
    user.notes = req.body.notes;
    user.timezone = req.body.timezone;


    if (req.file) {
      if (user?.profileImage?.publicId) {
        await cloudinary.v2.uploader.destroy(user?.profileImage?.publicId);
      }

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "paturi",
      });
      user.profileImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    await user.save();
    res.status(200).json({ success: true, message: "User updated successfully ✅ Please login again", user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! user logout
export const userLogout = async (req, res) => {
  try {
    res.clearCookie("userToken");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! DELETE USER OWN ACCOUNT BY ID  WHEN DELETE USER ALSO DELETE PROFILE IMAGE FROM CLOUDINARY
//! ( AND DELETE USER REVIEW AND LIKES AND COMMENTS AND ETC WHAT EVER IF IN FUTEURE NEED TO DELETE )
const deleteUserReplies = async (replies, userId) => {
  const updatedReplies = [];

  for (const reply of replies) {
    if (reply.userId.equals(userId)) {
      // Delete Cloudinary image if exists
      if (reply.imageReply?.publicId) {
        await cloudinary.v2.uploader.destroy(reply.imageReply.publicId);
      }
    } else {
      // Recursively process nested replies
      if (reply.replies && reply.replies.length > 0) {
        reply.replies = await deleteUserReplies(reply.replies, userId);
      }
      updatedReplies.push(reply);
    }
  }

  return updatedReplies;
};

export const userDeleteOwnAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) return res.status(404).json({ success: false, message: "User Unauthorized" });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await Auth.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Delete profile image
    if (user?.profileImage?.publicId) {
      await cloudinary.v2.uploader.destroy(user.profileImage.publicId);
    }

    // Delete user's own reviews
    const userReviews = await Reviews.find({ userId });
    for (const review of userReviews) {
      // Delete mediaReview image/video
      if (review?.mediaReview?.publicId) {
        const resourceType = review.mediaReview.type === "image" ? "image" : "video";
        await cloudinary.v2.uploader.destroy(review.mediaReview.publicId, { resource_type: resourceType });
      }

      // Delete comment images and replies
      for (const comment of review.comments || []) {
        if (comment.imageComment?.public_id) {
          await cloudinary.v2.uploader.destroy(comment.imageComment.public_id);
        }
        comment.replies = await deleteUserReplies(comment.replies || [], userId);
      }

      await Reviews.findByIdAndDelete(review._id);
    }

    // Delete user's comments on other reviews
    const reviewsWithUserComments = await Reviews.find({ "comments.userId": userId });
    for (const review of reviewsWithUserComments) {
      for (const comment of review.comments) {
        if (comment.userId.equals(userId) && comment.imageComment?.public_id) {
          await cloudinary.v2.uploader.destroy(comment.imageComment.public_id);
        }
        comment.replies = await deleteUserReplies(comment.replies || [], userId);
      }
      review.comments = review.comments.filter(comment => !comment.userId.equals(userId));
      await review.save();
    }

    // Delete user's replies on other reviews
    const reviewsWithUserReplies = await Reviews.find({ "comments.replies.userId": userId });
    for (const review of reviewsWithUserReplies) {
      for (const comment of review.comments) {
        comment.replies = await deleteUserReplies(comment.replies || [], userId);
      }
      await review.save();
    }

    // Delete user's likes
    await Reviews.updateMany(
      {},
      { $pull: { "likes.likedBy": { userId: new mongoose.Types.ObjectId(String(userId)) } } }
    );

    // Delete user account
    await Auth.findByIdAndDelete(userId);

    // Clear cookie
    res.clearCookie("userToken", { httpOnly: true, secure: true, sameSite: "none" });

    res.status(200).json({ success: true, message: "käyttäjätili poistettu onnistuneesti ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};