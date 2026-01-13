import api from "./api";

/**
 * Fetch problems by pattern ID
 */
export const getProblemsByPattern = async (patternId) => {
  const response = await api.get(`/problems/pattern/${patternId}`);
  return response.data;
};

/**
 * Fetch ALL problems (used for Practice page)
 */
export const getAllProblems = async () => {
  const response = await api.get("/problems");
  return response.data;
};
