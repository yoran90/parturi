import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.adminToken ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin. Invalid token.",
    });
  }

  /* try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" && decoded.role !== "super-admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin. Invalid token.",
    });
  } */


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid token.",
    });
  }

};
