import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

const getUserDetailsFromToken = async (token) => {
  try {
    if (!token) {
      return {
        message: "session out",
        logout: true,
      };
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch user details
    const user = await UserModel.findById(decoded.id).select("-password");

    // Check if user exists
    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (error) {
    // Handle specific error cases
    if (error.name === "JsonWebTokenError") {
      return {
        message: "Invalid token",
        logout: true,
      };
    } else if (error.name === "TokenExpiredError") {
      return {
        message: "Token expired",
        logout: true,
      };
    }

    // Handle unexpected errors
    return {
      message: error.message || "An error occurred",
      logout: true,
    };
  }
};

export default getUserDetailsFromToken;
