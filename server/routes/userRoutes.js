import { Router } from "express";
import { getMyProfile, loginUser, logoutUser, registerUser } from "../controllers/userContorllers.js";
import { authValidate } from "../middleware/auth.js";

const router = Router();

// register
router.post("/register", registerUser);
// login
router.post("/login", loginUser);
// profile (protected)
router.get("/profile",authValidate,getMyProfile);
// logout
router.post("/logout",authValidate,logoutUser)

export { router as userRoutes };
