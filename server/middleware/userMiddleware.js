import jwt from "jsonwebtoken";
import Auth from "../models/authModel.js";


export const userMiddleware = async (req, res, next) => {
  try {
    // Try to get token from cookies first (for browsers), then from Authorization header (for Safari fallback)
    let token = req.cookies.userToken;
    
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
      console.error("❌ No token found in cookies or Authorization header");
      console.error("Cookies:", req.cookies);
      console.error("Authorization header:", req.headers.authorization);
      return res.status(401).json({ message: "Unauthorized user normal. Invalid token." });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(decoded.id);
    if (!user) {
      console.error("❌ User not found with ID:", decoded.id);
      return res.status(404).json({ message: "User not found." });
    }
    
    //req.user = decoded;
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ userMiddleware error:", error.message);
    res.status(401).json({ message: "Unauthorized user normal. Invalid token." });
  }
}




