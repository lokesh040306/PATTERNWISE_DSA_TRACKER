import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

/**
 * Protect routes that require authentication
 */
export const protect = (req, res, next) => {
  let token;

  // Extract token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError(401, "Not authorized, token missing")
    );
  }

  try {
    const decoded = verifyToken(token);

    // Attach user to request
    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    return next(
      new ApiError(401, "Not authorized, invalid token")
    );
  }
};
