import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { registerUser, loginUser } from "./auth.service.js";

/**
 * Register user
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const result = await registerUser({ name, email, password });

    return res
      .status(201)
      .json(
        new ApiResponse(201, result, "User registered successfully")
      );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const result = await loginUser({ email, password });

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "Login successful")
      );
  } catch (error) {
    next(error);
  }
};
