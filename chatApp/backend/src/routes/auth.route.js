import { Router } from "express";
import { loginController, logoutController, signUpController, updateProfilePic, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/signup", signUpController);

router.put("/update-profile-pic", protectedRoute, updateProfilePic);

router.get("/check-auth", checkAuth);

export default router;