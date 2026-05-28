import express from "express";
import morgan from "morgan";
import assignmentRouter from "./routes/assignmentRoute.js";
import queryRouter from "./routes/queryRoute.js";
import hintGenerationRouter from "./routes/hintRoute.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/assignment", assignmentRouter);
app.use("/api/query", queryRouter);
app.use("/api/hint", hintGenerationRouter);
app.use("/api/auth", userRoutes);
export default app;
