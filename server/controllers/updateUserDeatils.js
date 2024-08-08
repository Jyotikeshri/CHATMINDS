import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";
import UserModel from "../Models/UserModel.js";

async function updateUserDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    if (!token) {
      return response.status(401).json({
        message: "Authentication token is missing",
        error: true,
      });
    }

    const user = await getUserDetailsFromToken(token);
    if (!user) {
      return response.status(401).json({
        message: "Invalid token",
        error: true,
      });
    }

    const { name, profile_pic } = request.body;
    if (!name || !profile_pic) {
      return response.status(400).json({
        message: "Name and profile picture are required",
        error: true,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      { name, profile_pic }
    );

    if (updateUser.nModified === 0) {
      return response.status(400).json({
        message: "User not updated",
        error: true,
      });
    }

    const userInformation = await UserModel.findById(user._id);

    return response.json({
      message: "User updated successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
    });
  }
}

export default updateUserDetails;
