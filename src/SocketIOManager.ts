import { Socket, io } from "socket.io-client";
import { environment } from "./environment";

export class SocketIOManager {
  static instance: SocketIOManager;
  private socket: Socket = {} as Socket;
  constructor() {
    if (!SocketIOManager.instance) {
      this.socket = io(environment.apiUrl, {
        autoConnect: false,
        path: "/booking-event",
        transports: ["polling", "websocket"],
        timeout: 50000,
      });
      SocketIOManager.instance = this;
    }
    return SocketIOManager.instance;
  }

  static getInstance() {
    if (!SocketIOManager.instance) {
      SocketIOManager.instance = new SocketIOManager();
    }

    return SocketIOManager.instance;
  }

  open() {
    this.socket.open();
  }
  close() {
    this.socket.close();
  }
  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }
  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
  on(...params: Parameters<typeof this.socket.on>) {
    this.socket.on(...params);
  }
  off(...params: Parameters<typeof this.socket.off>) {
    this.socket.off(...params);
  }
  emit(...params: Parameters<typeof this.socket.emit>) {
    this.socket.emit(...params);
  }
}

export default SocketIOManager;
