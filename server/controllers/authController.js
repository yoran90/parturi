import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
//import { v2 as cloudinaryV2 } from "cloudinary";
import cloudinary from "cloudinary";
import sendEmail from "../utlis/sendEmail.js";




//! register for user and admin
export const register = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, password } = req.body;

    if ( !firstName || !lastName || !gender || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkUser = await Auth.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Auth.create({ 
      firstName, 
      lastName, 
      gender, 
      email, 
      password: hashedPassword, 
      isVerified: false
    });

    // Generate verification URL
    const verifyToken = user.generateEmailVerificationToken();
    await user.save();

    // Create URL for email verification (frontend URL)
    const verifyURL = `http://localhost:5173/verify-email/${verifyToken}`;

    await sendEmail(user.email, "Email Verification", `Click the below link to verify your email ⬇️\n\n ${verifyURL}`);

    res.status(201).json({ success: true, message: "Registration successful. Please check your email to verify your account.", user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! send Email for verify email
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
    const verifyURL = `http://localhost:5173/admin-verify-email/${token}`;

    await sendEmail(user.email, "Email Verification", `Click the below link to verify your email ⬇️\n\n ${verifyURL}`);

    res.status(200).json({ success: true, message: "Verification email sent. Please check your email." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! now verify email to actiove account
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ success: false, message: "Token is required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await Auth.findOne({ 
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Email verified successfully. You can now login." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//! get user by id for admin
export const getUserByIdInAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.admin.role !== "admin" && req.admin.role !== "super-admin") {
      if (req.admin.id !== id) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
    }

    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! update user by id for admin change own data
export const updateUserById = async (req, res) => {
  try {
    const id = req.admin.id;
    
    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const {favoriteName, firstName, lastName, gender, email, bio, addressOne, addressTwo, country, city, postalCode, phoneNumber, notes, timezone} = req.body;

    

    if (favoriteName) user.favoriteName = favoriteName;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (addressOne) user.addressOne = addressOne;
    if (addressTwo) user.addressTwo = addressTwo;
    if (country) user.country = country;
    if (city) user.city = city;
    if (postalCode) user.postalCode = postalCode;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (notes) user.notes = notes;
    if (timezone) user.timezone = timezone;

    if (req.file) {

      // delete old image
      if (user.profileImage?.publicId) {
        await cloudinary.uploader.destroy(user.profileImage.publicId);
      }

      // upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
      });

      user.profileImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

     await user.save();
    res.status(200).json({ success: true, message: "User updated successfully", user });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! get all user for admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! super admin get all user data
export const superAdminGetUserDataById = async (req, res) => {
  try {
    if (req.admin.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { id } = req.params;

    const users = await Auth.find({ _id: { $ne: id } });
    if (!users) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: users });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! login FOR ADMIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      message: "Email and password are required" 
    });
  }

  try {
    const checkUser = await Auth.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, checkUser.password);
    if (!correctPassword) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    if (!checkUser.isEmailVerified) {
      return res.status(401).json({ 
        success: false,
        message: "Please verify your email before logging in" 
      });
    }

    const token = jwt.sign({
      id: checkUser._id,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      gender: checkUser.gender,
      profileImage: checkUser.profileImage,
      email: checkUser.email,
      role: checkUser.role,
    }, process.env.JWT_SECRET, {expiresIn: "60m"});


    const cookie = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    };

    res.cookie("adminToken", token, cookie);
    res.status(200).json({ 
      success: true,
      message: "Logged in successfully ✅",
      token,
      user: {
        id: checkUser._id,
        email: checkUser.email,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        gender: checkUser.gender,
        profileImage: checkUser.profileImage,
        role: checkUser.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//! logout FOR ADMIN
export const logout = async (req, res) => {
  res.clearCookie("adminToken").json({
    success: true,
    message: "Logged out successfully",
  })
};

//! admin forgot password
export const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate token using Auth model
    const token = user.generatePasswordReset();
    await user.save();

    // Create URL for reset password (frontend URL)
    const resetURL = `http://localhost:5173/admin-reset-password/${token}`;
    await sendEmail(user.email, "Password Reset Request", `Ignore if you don't want reset password if you want reset password\n\n Click the below link to reset your password ⬇️\n\n ${resetURL}`);

    res.status(200).json({ success: true, message: "Password reset link sent to email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! SUPER ADMIN UPDATE USER ROLE
export const superAdminUpdateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;


    if (!role || typeof role !== "string") {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (req.admin.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const validRole = ["user", "admin"];
    if (!validRole.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role === "super-admin") {
      return res.status(403).json({ success: false, message: "Cannot change super-admin role" });
    }

    user.role = role;
    await user.save();
    res.status(200).json({ success: true, message: "User role updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! super admin get user by id for update role
export const superAdminGetUserByIdForChangeRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.admin.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! super admin delete user 
export const adminDeleteUserOrAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Only super‑admins allowed
    if (req.admin.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const user = await Auth.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If the target user has role super‑admin, block deletion
    if (user.role === "super-admin") {
      return res.status(403).json({
        success: false,
        message: "You can't delete super admin",
      });
    }

    await Auth.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

