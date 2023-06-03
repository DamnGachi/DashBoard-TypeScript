import { Request, Response } from "express";
import ChatDAL from "../service/chatroom";

class ChatRoomController {
    async createRoom(req: Request, res: Response) {
        try {
            const result = await ChatDAL.createChat(req.body);
            res.send(result).status(200);
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
    async logMessage(req: Request, res: Response) {
        try {
            const result = await ChatDAL.logMessage(req.body);
            res.send(result).status(200);
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
}

export default new ChatRoomController();
