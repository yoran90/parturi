import express from "express"
import { getUserById, userLogin, userLogout, userUpdateOwnData } from "../controllers/userController.js"
import multer from "multer";
import { userMiddleware } from "../middleware/userMiddleware.js";

const router = express.Router()



const storage = multer.diskStorage({});
export const upload = multer({ storage });


router.post("/userLogin", userLogin);
router.get("/getUser/:id", userMiddleware, getUserById);
router.post('/userLogout', userMiddleware, userLogout);
router.put('/userUpdateData', userMiddleware, upload.single("image"), userUpdateOwnData);


router.get("/check-user", userMiddleware, (req, res) => {

  const user = req.user

  return res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      gender: req.user.gender,
      profileImage: req.user.profileImage,
      favoriteName: req.user.favoriteName,
      bio: req.user.bio,
      addressOne: req.user.addressOne,
      addressTwo: req.user.addressTwo,
      country: req.user.country,
      city: req.user.city,
      postalCode: req.user.postalCode,
      phoneNumber: req.user.phoneNumber,
      notes: req.user.notes,
      timezone: req.user.timezone,
      role: req.user.role 
    }
  });
})


export default router