import { Problem } from "../../models/Problem.model.js";
import { Pattern } from "../../models/Pattern.model.js";
import ApiError from "../../utils/ApiError.js";

/**
 * Create a new problem
 * - Used for seeding / admin
 */
export const createProblem = async (problemData) => {
  const problem = await Problem.create(problemData);
  return problem;
};

/**
 * Get all problems for a specific pattern
 * - Used in Pattern Detail page
 * - RETURNS pattern + problems (IMPORTANT)
 */
export const getProblemsByPattern = async (patternId) => {
  // 1️⃣ Fetch pattern by MongoDB _id
  const pattern = await Pattern.findById(patternId);

  if (!pattern) {
    throw new ApiError(404, "Pattern not found");
  }

  // 2️⃣ Fetch problems belonging to this pattern
  const problems = await Problem.find({ pattern: pattern._id })
    .sort({ difficulty: 1, order: 1 });

  // 3️⃣ Return structured payload
  return {
    pattern,
    problems,
  };
};

/**
 * Get single problem by ID
 * - Used in Problem Workspace (future)
 */
export const getProblemById = async (problemId) => {
  const problem = await Problem.findById(problemId).populate(
    "pattern",
    "name"
  );

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  return problem;
};
