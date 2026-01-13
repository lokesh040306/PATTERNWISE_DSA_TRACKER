import { Progress } from "../../models/Progress.model.js";
import { Problem } from "../../models/Problem.model.js";

/**
 * Create or update progress for a user & problem
 * - Handles solved / reviseLater / notes
 */
export const upsertProgress = async ({
  userId,
  problemId,
  solved,
  reviseLater,
  notes,
}) => {
  const progress = await Progress.findOneAndUpdate(
    { user: userId, problem: problemId },
    {
      solved,
      reviseLater,
      notes,
    },
    {
      new: true,
      upsert: true,
    }
  );

  return progress;
};

/**
 * Get all progress for logged-in user
 * - Used for dashboard & pattern progress
 */
export const getUserProgress = async (userId) => {
  const progress = await Progress.find({ user: userId })
    .populate({
      path: "problem",
      select: "title difficulty pattern",
      populate: {
        path: "pattern",
        select: "name",
      },
    });

  return progress;
};

/**
 * Get pattern-wise progress for user
 */
export const getPatternProgressByUser = async (userId) => {
  const solvedProgress = await Progress.find({
    user: userId,
    solved: true,
  }).populate({
    path: "problem",
    select: "pattern",
  });

  const solvedMap = {};
  solvedProgress.forEach((entry) => {
    const patternId = entry.problem?.pattern?.toString();
    if (!patternId) return;

    solvedMap[patternId] = (solvedMap[patternId] || 0) + 1;
  });

  const totalByPattern = await Problem.aggregate([
    {
      $group: {
        _id: "$pattern",
        totalCount: { $sum: 1 },
      },
    },
  ]);

  const result = totalByPattern.map((item) => ({
    patternId: item._id,
    completedCount: solvedMap[item._id?.toString()] || 0,
    totalCount: item.totalCount,
  }));

  return result;
};

/* ------------------------------------------------------------------ */
/* 📝 NOTES PER QUESTION HELPERS */
/* ------------------------------------------------------------------ */

/**
 * Get progress for a user & specific problem
 */
export const getProgressByUserAndProblem = async ({
  userId,
  problemId,
}) => {
  return await Progress.findOne({
    user: userId,
    problem: problemId,
  });
};

/**
 * Save / update notes for a problem
 */
export const updateProblemNote = async ({
  userId,
  problemId,
  notes,
}) => {
  return await Progress.findOneAndUpdate(
    { user: userId, problem: problemId },
    { notes },
    { upsert: true, new: true }
  );
};
