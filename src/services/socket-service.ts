import { redisClient } from "@/config/redis";

export const sendRealTimeMessage = (message: {
  to: string;
  data: any;
  event: "new_application";
}) => {
  if (!message.event || !message.to) {
    return;
  }
  redisClient.publish("socket_io", JSON.stringify(message));
};
