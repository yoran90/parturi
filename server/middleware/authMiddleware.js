import jwt from "jsonwebtoken";
import Auth from "../models/authModel.js";

export const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.adminToken ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin. Invalid token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const adminUser = await Auth.findById(decoded.id);
    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized admin. User not found.",
      });
    }

    if (adminUser.role !== "admin" && adminUser.role !== "super-admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    req.admin = adminUser;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin. Invalid token.",
    });
  }
};
