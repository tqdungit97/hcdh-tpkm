import { io } from "socket.io-client";
import { environment } from "../environment";

export const socket = io(environment.apiUrl, {
  autoConnect: false,
  path: "/booking-event",
  transports: ["polling", "websocket"],
  timeout: 50000,
});

export function useSocketIO() {
  return socket;
}
