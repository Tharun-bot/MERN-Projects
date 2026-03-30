import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllUsersForSidebar, getMessages, sendMessage } from "../controllers/message.contoller.js";

const router = Router();

router.get("/get-users", protectedRoute, getAllUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);
router.post("/:id", protectedRoute, sendMessage);

export default router;