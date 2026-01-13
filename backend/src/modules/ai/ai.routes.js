import express from "express";
import {
  getHint,
  getPatternExplanation,
  getRevisionNotes,
} from "./ai.controller.js";

const router = express.Router();

router.post("/hint", getHint);
router.post("/pattern-explain", getPatternExplanation);
router.post("/revision", getRevisionNotes);

export default router;
