import { Pattern } from "../../models/Pattern.model.js";

/**
 * Create a new pattern
 * (Used for seeding / admin / future panel)
 */
export const createPattern = async (patternData) => {
  const pattern = await Pattern.create(patternData);
  return pattern;
};

/**
 * Get all patterns
 * Used in Pattern Sheet page
 */
export const getAllPatterns = async () => {
  const patterns = await Pattern.find().sort({ createdAt: 1 });
  return patterns;
};

/**
 * Get single pattern by ID
 * Used in Pattern Detail page
 */
export const getPatternById = async (patternId) => {
  const pattern = await Pattern.findById(patternId);

  if (!pattern) {
    throw new Error("Pattern not found");
  }

  return pattern;
};
