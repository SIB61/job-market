import { Server, Socket } from "socket.io";
import { redisSubscriber } from "./redis";
import { verify } from "jsonwebtoken";
import { UserToken } from "@/types/user-token";
const createIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: server,
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
  });

  setupListeners(io);
  subscribeToRedisSocketIoChannel(io);
  return io;
};

const subscribeToRedisSocketIoChannel = async (io: Server) => {
  redisSubscriber.subscribe("socket_io");
  redisSubscriber.on("message", (channel, messageString) => {
    if (channel !== "socket_io") {
      return;
    }
    const message = JSON.parse(messageString);
    io.to(message.to).emit(message.event, message.data);
  });
};

const validateConnection = (socket: Socket): UserToken | null => {
  let token = socket.handshake.auth?.token;
  let userType = socket.handshake.auth?.userType;
  if (!token || !userType) {
    return null;
  }

  try {
    return verify(token, process.env.JWT_SECRET!!) as UserToken;
  } catch (err) {
    return null;
  }
};

const setupListeners = (io: Server) => {
  io.on("connection", async (socket) => {
    const user = validateConnection(socket);
    if (!user) {
      socket.disconnect();
      return;
    }
    const { id: userId } = user;
    socket.join(userId);
  });
};

export { createIO };
