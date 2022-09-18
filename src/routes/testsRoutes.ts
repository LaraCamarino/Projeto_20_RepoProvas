import { Router } from "express";
import { insertNewTest, getTestsGroupedByTerms, getTestsGroupedByTeacher } from "../controllers/testsController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewTest from "../schemas/validateNewTest.js";

const router = Router();

router.post("/tests", validateToken, validateNewTest, insertNewTest);
router.get("/tests/terms", validateToken, getTestsGroupedByTerms);
router.get("/tests/teachers", validateToken, getTestsGroupedByTeacher);

export default router;