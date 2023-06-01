// import socket from "socket.io";
// import http from "http";
// import redis from "redis";
// import { promisify } from "util";
// import { url } from "./src/utils/secrets";

// const redisGetAsync = promisify(redisClient.get).bind(redisClient);

// io.on("connect", (ioSocket: any) => {
//     ioSocket.on("joinRoom", async (key: string) => {
//         ioSocket.join(key);

//         const messageData = await redisGetAsync(key);

//         // need to make sure that we are grabbing this history data on the frontend
//         ioSocket.emit("history", messageData);
//     });

//     ioSocket.on("message", (message: Message) => {
//         // save message
//         saveMessage(message);
//         // to everybody in the room including myself
//         ioSocket.nsp.to(message.key).emit("message", message);
//     });
// });

// const saveMessage = async (message: Message) => {
//     const { key } = message;

//     const data = await redisGetAsync(key);

//     // the first message in the chat room
//     if (!data) {
//         return redisClient.set(key, "[]");
//     }

//     const json = JSON.parse(data);
//     json.push(message);

//     redisClient.set(key, JSON.stringify(json));
// };

// type Message = {
//     text: string;
//     date: Date;
//     key: string;
//     image?: string;
// };
