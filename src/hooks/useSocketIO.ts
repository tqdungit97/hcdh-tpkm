import { io } from "socket.io-client";
import { useEffect } from "react";
import { environment } from "../environment";

export const socket = io(environment.apiUrl, {
  autoConnect: false,
  path: "/booking-event",
  transports: ["polling", "websocket"],
  timeout: 50000,
});

export function useSocketIO() {
  useEffect(() => {
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);
  return socket;
}
