import jwt from "jsonwebtoken";
import Auth from "../models/authModel.js";


export const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized user normal. Invalid token." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    //req.user = decoded;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized user normal. Invalid token." });
  }
}