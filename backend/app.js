import express from "express";
import morgan from "morgan";
import assignmentRouter from "./routes/assignmentRoute.js";
import queryRouter from "./routes/queryRoute.js";
import hintGenerationRouter from "./routes/hintRoute.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/assignment", assignmentRouter);
app.use("/api/query", queryRouter);
app.use("/api/hint", hintGenerationRouter);
export default app;
