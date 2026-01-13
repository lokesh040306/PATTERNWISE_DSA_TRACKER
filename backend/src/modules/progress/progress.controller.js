import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  upsertProgress,
  getUserProgress,
  getPatternProgressByUser,
  getProgressByUserAndProblem,
  updateProblemNote,
} from "./progress.service.js";

/**
 * Update user progress (mark / unmark problem)
 */
export const update = async (req, res, next) => {
  try {
    const { problemId } = req.body;

    if (!problemId) {
      throw new ApiError(400, "Problem ID is required");
    }

    const progress = await upsertProgress({
      userId: req.user.id,
      ...req.body,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, progress, "Progress updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get logged-in user's full progress
 */
export const getMyProgress = async (req, res, next) => {
  try {
    const progress = await getUserProgress(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, progress, "User progress fetched")
      );
  } catch (error) {
    next(error);
  }
};

/**
 * Get pattern-wise progress for logged-in user
 */
export const getPatternProgress = async (req, res, next) => {
  try {
    const progress = await getPatternProgressByUser(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          progress,
          "Pattern-wise progress fetched"
        )
      );
  } catch (error) {
    next(error);
  }
};

/**
 * 📝 NEW: Get note for a specific problem (user-specific)
 */
export const getProblemNote = async (req, res, next) => {
  try {
    const { problemId } = req.params;

    if (!problemId) {
      throw new ApiError(400, "Problem ID is required");
    }

    const progress = await getProgressByUserAndProblem({
      userId: req.user.id,
      problemId,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        progress?.notes || "",
        "Problem note fetched"
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * 📝 NEW: Save / update note for a problem
 */
export const saveProblemNote = async (req, res, next) => {
  try {
    const { problemId } = req.params;
    const { notes } = req.body;

    if (!problemId) {
      throw new ApiError(400, "Problem ID is required");
    }

    await updateProblemNote({
      userId: req.user.id,
      problemId,
      notes: notes || "",
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "Problem note saved")
      );
  } catch (error) {
    next(error);
  }
};
