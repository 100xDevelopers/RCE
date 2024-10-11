import express, { NextFunction, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import notFoundHandler from "./app/middlewares/not-found.middleware";
import errorHandler from "./app/middlewares/error.middleware";
import ApiResponse from "./app/utils/apiResponse";
import morganMiddleware from "./app/logger/morgan.logger";
import ApiV1Routes from './app/routes/v1'

dotenv.config();

const app = express();

const router = express.Router();

app.use(express.json({ limit: "16kb" }));

app.use(urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(morganMiddleware)

app.use(router);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  new ApiResponse(res, 200, "Server is running successfully");
});

app.use("/api/v1", ApiV1Routes)

app.use("*", notFoundHandler);

app.use(errorHandler);

export default app;
