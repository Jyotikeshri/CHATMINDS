async function logout(request, response) {
  try {
    const cookieOptions = {
      httpOnly: true, // Corrected from http: true
      secure: true,
      sameSite: "None", // Adjust according to your needs
    };

    // Clear the cookie by setting its value to an empty string and expiring it immediately
    return response
      .cookie("token", "", {
        ...cookieOptions,
        expires: new Date(0), // Expire the cookie immediately
      })
      .status(200)
      .json({
        message: "Session out",
        success: true,
      });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

export default logout;
