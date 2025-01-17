import "module-alias/register";
import { config } from "dotenv";
config({});
config({ path: `.env.local`, override: true });
import connectDb from "./config/db";
import app from "@/app";
import logger from "./utils/logger";
import { createServer } from "http";
import { createIO } from "./config/socket";

const port = process.env.PORT || 3000;
const server = createServer(app);
connectDb();
createIO(server)
server.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
