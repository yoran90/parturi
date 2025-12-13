import express from "express";
import {  
  adminDeleteUserOrAdmin,
  adminForgotPassword,
  authMiddleware, 
  getAllUsers, 
  getUserByIdInAdmin, 
  login, 
  logout, 
  register, 
  sendVerificationEmail, 
  superAdminGetUserByIdForChangeRole, 
  superAdminGetUserDataById, 
  superAdminUpdateUserRole, 
  updateUserById, 
  verifyEmail
} from "../controllers/authController.js";
import multer from "multer";
import { getReviewById, getReviewByIdAndDelete } from "../controllers/reviewsController.js";
import { userResetPassword } from "../controllers/userController.js";


const router = express.Router();

//! cloudinary Storage
const storage = multer.diskStorage({});
export const upload = multer({ storage });



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", authMiddleware, getAllUsers);
router.get("/userForAdmin/:id", authMiddleware, getUserByIdInAdmin);
router.put("/updateUser", upload.single("image"), authMiddleware, updateUserById);
router.get("/getUserDataById/:id", authMiddleware, superAdminGetUserDataById);
router.put("/updateUserRole/:id", authMiddleware, superAdminUpdateUserRole);
router.get("/getUserForAdminForChangeRole/:id", authMiddleware, superAdminGetUserByIdForChangeRole);
router.delete("/adminDeleteUserOrAdmin/:id", authMiddleware, adminDeleteUserOrAdmin);



//! get review by id
router.get("/getReview/:id", authMiddleware, getReviewById);
router.delete("/deleteReview/:id", authMiddleware, getReviewByIdAndDelete);


//! user forget password <-> is mean both can be used admin and user bc have only one model and use it only userController
router.post("/admin-forget-password", adminForgotPassword);

//! user reset password <-> is mean both can be used admin and user bc have only one model and use it only userController
router.post("/admin-reset-password/:token", userResetPassword);

//! admin send verificaton email again for admin for user same controller API 
router.post("/admin-send-verification-email", sendVerificationEmail);

router.post("/admin-verify-email/:token", verifyEmail);

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
      favoriteName: admin.favoriteName,
      bio: admin.bio,
      addressOne: admin.addressOne,
      addressTwo: admin.addressTwo,
      country: admin.country,
      city: admin.city,
      postalCode: admin.postalCode,
      phoneNumber: admin.phoneNumber,
      notes: admin.notes,
      timezone: admin.timezone,
      role: admin.role 
    }
  });
});



export default router;