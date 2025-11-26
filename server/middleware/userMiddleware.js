import jwt from "jsonwebtoken";


export const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized user normal. Invalid token." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized user normal. Invalid token." });
  }
}