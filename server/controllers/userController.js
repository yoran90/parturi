import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";





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
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const cookie = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("userToken", token, cookie);
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

//! GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Auth.findById(id);
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
