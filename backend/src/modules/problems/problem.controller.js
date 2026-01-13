import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createProblem,
  getProblemsByPattern,
  getProblemById,
} from "./problem.service.js";
import { Problem } from "../../models/Problem.model.js";

export const create = async (req, res, next) => {
  try {
    const { title, pattern, difficulty } = req.body;

    if (!title || !pattern || !difficulty) {
      throw new ApiError(400, "Title, pattern and difficulty are required");
    }

    const problem = await createProblem(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, problem, "Problem created"));
  } catch (error) {
    next(error);
  }
};

export const getByPattern = async (req, res, next) => {
  try {
    const problems = await getProblemsByPattern(req.params.patternId);

    res
      .status(200)
      .json(
        new ApiResponse(200, problems, "Problems fetched by pattern")
      );
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const problem = await getProblemById(req.params.id);

    res
      .status(200)
      .json(new ApiResponse(200, problem, "Problem fetched"));
  } catch (error) {
    next(error);
  }
};

export const getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find({});
    res.json({
      success: true,
      data: problems,
    });
  } catch (err) {
    next(err);
  }
};
