import express from "express";
import cors from "cors";
import router from "./router";
import { UserToken } from "./types/user-token";
import errorResponseMiddleware from "./middlewares/error-response-middleware";
import requestUserMiddleware from "./middlewares/request-user-middleware";
import { Server } from "socket.io";

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
      io?: Server;
    }
  }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/api", requestUserMiddleware);
app.use("/api", router);
app.use("/api", errorResponseMiddleware);

export default app;
