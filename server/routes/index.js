import express from "express";
import registerUser from "../controllers/registerUser.js";
import logout from "../controllers/logOut.js";
import checkEmail from "../controllers/checkEmail.js";
import checkPassword from "../controllers/checkPassword.js";
import userDetails from "../controllers/userDetails.js";
import updateUserDetails from "../controllers/updateUserDeatils.js";
import searchUser from "../controllers/searchUser.js";

const router = express.Router();

// Create user API
router.post("/register", registerUser);
// Check user email
router.post("/email", checkEmail);
// // Check user password
router.post("/password", checkPassword);
// // Login user details
router.get("/user-details", userDetails);
// Logout user
router.get("/logout", logout);
// Update user details
router.post("/update-user", updateUserDetails);
// // Search user
router.post("/search-user", searchUser);

export default router;
