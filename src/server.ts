import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log("Server running on port " + process.env.PORT));