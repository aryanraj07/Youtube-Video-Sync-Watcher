import { io } from "socket.io-client";

let socket;

export const createSocket = (token) => {
  if (!socket) {
    console.log("🔌 Creating new socket connection...");
    socket = io("http://localhost:8000", {
      transports: ["websocket"], // enforce WebSocket
      auth: { token }, // attach token properly
    });
  } else {
    console.log("♻️ Reusing existing socket connection");
  }
  return socket;
};
