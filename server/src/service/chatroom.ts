import { CreateChatRoom, logMessage } from "../dto/chatroom";
import { prisma } from "../utils/connectDB";

class ChatDAL {
    async createChat(data: CreateChatRoom) {
        const chatRoom = await prisma.chatRoom.create({ data });
        if (chatRoom) {
            console.log("Chat created success");
        } else {
            console.log("Chat created error");
        }
    }
    async logMessage(data: logMessage) {
        // const getCurrentUser = "somewhere import functionality";
        const regsiterMessage = await prisma.message.create({ data });

        if (regsiterMessage) {
            return "Chat created success";
        } else {
            return "Chat created error";
        }
    }
    async deleteMessage(id: string) {
        null;
    }
    async editMessage(id: string, text: string) {
        null;
    }
}

export default new ChatDAL();
