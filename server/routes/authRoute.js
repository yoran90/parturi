import express from "express";
import jwt from "jsonwebtoken";
import {  authMiddleware, getAllUsers, login, logout, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", authMiddleware, getAllUsers);


router.get("/check-auth", authMiddleware, (req, res) => {
  const admin = req.admin;

  return res.status(200).json({
    success: true,
    user: {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      gender: admin.gender,
      profileImage: admin.profileImage,
      role: admin.role 
    }
  });
});



export default router;