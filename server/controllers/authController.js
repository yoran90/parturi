import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//! login 
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
      email: checkUser.email,
      role: checkUser.role
    }, process.env.JWT_SECRET, {expiresIn: "60m"});


    const cookie = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
    };

    res.cookie("token", token, cookie);
    res.status(200).json({ 
      success: true,
      message: "Logged in successfully ✅",
      token,
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//! logout
export const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  })
};


//! Auth Middleware
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user. Invalid token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user. Invalid token.",
    });
  }
}