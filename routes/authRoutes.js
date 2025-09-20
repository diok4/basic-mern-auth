import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/reset-password", userAuth, resetPassword);

export default authRouter;
