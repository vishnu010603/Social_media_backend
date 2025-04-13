import express from "express";
import { signup, login, updateProfilePic } from "../controllers/user.controller.js";
import upload from "../utils/multer.utils.js";
import auth from "../middlewares/auth.middleware.js";




const router = express.Router();

router.post("/signup", upload.single("profilePic"), signup); 
router.post("/login", login);
router.put("/profile-pic", auth, upload.single("profilePic"), updateProfilePic);

export default router;
