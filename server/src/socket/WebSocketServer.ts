import { Server as SocketIOServer, Socket } from "socket.io";
import { Server } from "http";
import { CorsOptions } from "cors";

interface CustomCorsOptions {
  cors: CorsOptions;
}

export class WebSocketServer {
  private io: SocketIOServer;
  private userSocketMap: Map<string, string> = new Map();

  constructor(server: Server, corsOptions: CustomCorsOptions) {
    this.io = new SocketIOServer(server, corsOptions);
    this.io.on("web socket connection", (socket) =>
      this.handleConnection(socket)
    );
  }

  private handleConnection(socket: Socket): void {
    console.log("a user has connected", socket.id);
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      this.userSocketMap.set(userId, socket.id);
    }

    // io.emit() is used to send events too all the connected user
    this.io.emit("getOnlineUsers", this.userSocketMap.keys());

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => this.handleDisconnection(socket));
  }

  private handleDisconnection(socket: Socket): void {
    console.log("user disconnected", socket.id);
    // Remove the disconnected user from the map
    this.userSocketMap.forEach((value, key) => {
      if (value === socket.id) {
        this.userSocketMap.delete(key);
      }
    });

    this.io.emit("getOnlineUsers", this.userSocketMap.keys());
  }

  private getReceiverSocketId(receiverId: string): string | undefined {
    return this.userSocketMap.get(receiverId);
  }

  public getIo(): SocketIOServer {
    return this.io;
  }
}
