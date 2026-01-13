import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  generateHint,
  explainPattern,
  generateRevision,
} from "./ai.service.js";

export const getHint = async (req, res, next) => {
  try {
    const { problemTitle, pattern } = req.body;

    if (!problemTitle || !pattern) {
      throw new ApiError(400, "Problem title and pattern are required");
    }

    const hint = await generateHint({ problemTitle, pattern });

    res
      .status(200)
      .json(new ApiResponse(200, { hint }, "Hint generated"));
  } catch (error) {
    next(error);
  }
};

export const getPatternExplanation = async (req, res, next) => {
  try {
    const { pattern } = req.body;

    if (!pattern) {
      throw new ApiError(400, "Pattern is required");
    }

    const explanation = await explainPattern({ pattern });

    res
      .status(200)
      .json(
        new ApiResponse(200, { explanation }, "Pattern explained")
      );
  } catch (error) {
    next(error);
  }
};

export const getRevisionNotes = async (req, res, next) => {
  try {
    const { pattern } = req.body;

    if (!pattern) {
      throw new ApiError(400, "Pattern is required");
    }

    const notes = await generateRevision({ pattern });

    res
      .status(200)
      .json(new ApiResponse(200, { notes }, "Revision notes generated"));
  } catch (error) {
    next(error);
  }
};
