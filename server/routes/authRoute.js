import express from "express";
import {  
  authMiddleware, 
  getAllUsers, 
  getUserById, 
  login, 
  logout, 
  register, 
  superAdminGetUserDataById, 
  superAdminUpdateUserRole, 
  updateUserById 
} from "../controllers/authController.js";
import multer from "multer";


const router = express.Router();

//! cloudinary Storage
const storage = multer.diskStorage({});
export const upload = multer({ storage });



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", authMiddleware, getAllUsers);
router.get("/user/:id", authMiddleware, getUserById);
router.put("/updateUser", upload.single("image"), authMiddleware, updateUserById);
router.put("/updateUserRole/:id", authMiddleware, superAdminUpdateUserRole);
router.get("/getUserDataById/:id", authMiddleware, superAdminGetUserDataById);




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