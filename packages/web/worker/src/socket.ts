import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export function connectWebsocket(url: string) {
  const socket = io(url, {
    transports: ["websocket"],
    path: "/sock/pop",
  });

  listenConnectionEvent(socket);

  return socket;
}

function listenConnectionEvent(socket: Socket) {
  socket.on("connect", () => console.log("websocket connected"));
  socket.on("error", console.error);
  socket.on("reconnect_failed", console.error);
}
