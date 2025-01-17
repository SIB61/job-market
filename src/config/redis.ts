import logger from "@/utils/logger";
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URI as string, {
  lazyConnect: true,
});

const redisSubscriber = new Redis(process.env.REDIS_URI as string, {
  lazyConnect: true,
});

redisClient.on("connect", () => {
  logger.info(
    `> Redis client connected on: ${redisClient.options.host}:${redisClient.options.port}`,
  );
});

redisSubscriber.on("connect", () => {
  logger.info(
    `> Redis subscriber connected on: ${redisSubscriber.options.host}:${redisSubscriber.options.port}`,
  );
});

export { redisClient, redisSubscriber };
