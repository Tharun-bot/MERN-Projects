import { Router } from "express";
import { getAllNotes, deleteNote, updateNote, createNote, getNoteById} from "../controllers/noteControllers.js";

//initiate a router instance

const router = Router();

router.get("/", getAllNotes);
router.delete("/:id", deleteNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.get("/:id", getNoteById);

export default router;