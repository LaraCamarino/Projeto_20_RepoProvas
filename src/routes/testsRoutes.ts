import { Router } from "express";
import { insertNewTest } from "../controllers/testsController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewTest from "../schemas/validateNewTest.js";

const router = Router();

router.post("/tests", validateToken, validateNewTest, insertNewTest);

export default router;