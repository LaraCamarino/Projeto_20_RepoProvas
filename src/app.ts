import express from "express";
import cors from "cors";
import "express-async-errors";

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import testsRoutes from "./routes/testsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes, testsRoutes, errorHandler);

export default app;