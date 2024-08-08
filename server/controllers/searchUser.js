import UserModel from "../Models/UserModel.js";

async function searchUser(request, response) {
  try {
    const { search } = request.body;

    console.log("Search query:", search);

    const query = new RegExp(search, "i");

    console.log("Executing query:", {
      $or: [{ name: query }, { email: query }],
    });

    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    console.log("Query result:", user);

    return response.json({
      message: "All users",
      data: user,
      success: true,
    });
  } catch (error) {
    console.error("Error during search:", error);
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
    });
  }
}

export default searchUser;
