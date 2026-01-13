import express from "express";
import { create, getByPattern, getOne, getAllProblems } from "./problem.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Problem Routes
 * - Create is protected
 * - Read routes are public
 */
router.post("/", protect, create);
router.get("/pattern/:patternId", getByPattern);
router.get("/", getAllProblems);
router.get("/:id", getOne);

export default router;
