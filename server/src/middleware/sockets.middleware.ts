import { Server, Socket } from "socket.io";
import { v4 as uuid } from "uuid";
// import BaseDAL from "../service/base";
// import token from "../utils/token";

interface Room {
    id: string;
    title: string;
    description: string;
}

let rooms: Room[] = [];

export default (server: any) => {
    const io = new Server(server);
    // const user = BaseDAL.getUserFromToken(token);
    io.on("connection", (socket: Socket): void => {
        console.log("user connected:", socket.id);

        // Send all messages to the client
        socket.emit("server:loadchats", rooms);

        socket.on("client:newchat", (newChat: Room): void => {
            const chat: Room = { ...newChat, id: uuid() };
            rooms.push(chat);
            io.emit("server:newchat", chat);
        });

        socket.on("client:deletechat", (chatId: string): void => {
            console.log(chatId);
            rooms = rooms.filter((chat: Room) => chat.id !== chatId);
            io.emit("server:loadchats", rooms);
        });

        socket.on("client:getchat", (chatId: string): void => {
            const chat: Room | undefined = rooms.find(
                (chat: Room) => chat.id === chatId
            );
            socket.emit("server:selectedchat", chat);
        });

        socket.on("client:updatechat", (updatedChat: Room): void => {
            rooms = rooms.map((chat: Room) => {
                if (chat.id === updatedChat.id) {
                    chat.title = updatedChat.title;
                    chat.description = updatedChat.description;
                }
                return chat;
            });
            io.emit("server:loadchats", rooms);
        });

        socket.on("join_room", (room) => {
            socket.join(room);
        });
        socket.on("message", ({ room, message }) => {
            socket.to(room).emit("message", {
                message,
                name: "Friend",
            });
        });
        socket.on("typing", ({ room }) => {
            socket.to(room).emit("typing", "Someone is typing");
        });

        socket.on("stopped_tying", ({ room }) => {
            socket.to(room).emit("stopped_tying");
        });
        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
    });
};
