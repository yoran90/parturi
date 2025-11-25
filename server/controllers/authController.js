import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

    const user = await Auth.create({ firstName, lastName, gender, email, password: hashedPassword });
    res.status(201).json({ success: true, message: "User created successfully", user });

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

//! admin update user
const adminUpdateUserRole = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! login FOR ADMIN
export const login = async (req, res) => {
  const { email, password } = req.body;
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

    const token = jwt.sign({
      id: checkUser._id,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      gender: checkUser.gender,
      profileImage: checkUser.profileImage,
      email: checkUser.email,
      role: checkUser.role
    }, process.env.JWT_SECRET, {expiresIn: "60m"});


    /* const cookie = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    }; */

    res.cookie("adminToken", token, {
      httpOnly: true,           
      secure: false,             
      sameSite: "lax",          
      path: "/",                 
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });


   // res.cookie("adminToken", token, cookie);
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


//! Auth Middleware FOR ADMIN
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.adminToken;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user. Invalid token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin" && decoded.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized user. Invalid token." });
  }
}