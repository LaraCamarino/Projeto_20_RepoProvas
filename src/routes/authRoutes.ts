import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import validateSignUp from "../schemas/validateSignUp.js";
import validateSignIn from "../schemas/validateSignIn.js";

const router = Router();

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

export default router;