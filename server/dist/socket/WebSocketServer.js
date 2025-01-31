"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const socket_io_1 = require("socket.io");
class WebSocketServer {
    constructor(server, corsOptions) {
        this.userSocketMap = new Map();
        this.io = new socket_io_1.Server(server, corsOptions);
        this.io.on("web socket connection", (socket) => this.handleConnection(socket));
    }
    handleConnection(socket) {
        console.log("a user has connected", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
            this.userSocketMap.set(userId, socket.id);
        }
        // io.emit() is used to send events too all the connected user
        this.io.emit("getOnlineUsers", this.userSocketMap.keys());
        // socket.on() is used to listen to the events. can be used both on client and server side
        socket.on("disconnect", () => this.handleDisconnection(socket));
    }
    handleDisconnection(socket) {
        console.log("user disconnected", socket.id);
        // Remove the disconnected user from the map
        this.userSocketMap.forEach((value, key) => {
            if (value === socket.id) {
                this.userSocketMap.delete(key);
            }
        });
        this.io.emit("getOnlineUsers", this.userSocketMap.keys());
    }
    getReceiverSocketId(receiverId) {
        return this.userSocketMap.get(receiverId);
    }
    getIo() {
        return this.io;
    }
}
exports.WebSocketServer = WebSocketServer;
