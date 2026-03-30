import { Router } from "express";
import { loginController, logoutController, signUpController, updateProfilePic } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/signup", signUpController);

router.put("/update-profile-pic", protectedRoute, updateProfilePic);

export default router;