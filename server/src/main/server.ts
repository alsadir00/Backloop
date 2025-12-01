import express from "express";
import userRouter from "@presentation/routes/userRoutes";
import { AppError } from "@shared/error/AppError";
import "dotenv/config"
import { ConnectMongoDB } from "@infrastructure/database/mongoDB";



const app = express();
app.use(express.json());
ConnectMongoDB();

app.use("/api/v1/users", userRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});