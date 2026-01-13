import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createPattern,
  getAllPatterns,
  getPatternById,
} from "./pattern.service.js";

export const create = async (req, res, next) => {
  try {
    const { name, description, whenToUse, commonMistakes, codeTemplate } =
      req.body;

    if (!name || !description) {
      throw new ApiError(400, "Name and description are required");
    }

    const pattern = await createPattern({
      name,
      description,
      whenToUse,
      commonMistakes,
      codeTemplate,
    });

    res
      .status(201)
      .json(new ApiResponse(201, pattern, "Pattern created"));
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const patterns = await getAllPatterns();

    res
      .status(200)
      .json(new ApiResponse(200, patterns, "Patterns fetched"));
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const pattern = await getPatternById(req.params.id);

    res
      .status(200)
      .json(new ApiResponse(200, pattern, "Pattern fetched"));
  } catch (error) {
    next(error);
  }
};
