import express from "express";
import {
  getUserNotes,
  createNote,
  deleteNote
} from "../controllers/NotesController.js";
const router = express.Router();

router.get("/get_user_notes/:user_name/:offset/:limit", getUserNotes);
router.post("/create_note", createNote);
router.delete("/delete_note", deleteNote);

export {router}
