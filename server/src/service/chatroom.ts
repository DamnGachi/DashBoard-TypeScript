import { CreateChatRoom, logMessage } from "../dto/chatroom";
import { prisma } from "../utils/connectDB";

class ChatDAL {
    async createChat(data: CreateChatRoom) {
        const chatRoom = await prisma.chatRoom.create({ data });
        if (chatRoom) {
            console.log("Chat created success");
            return chatRoom;
        } else {
            console.log("Chat created error");
        }
    }
    async logMessage(data: logMessage) {
        const regsiterMessage = await prisma.message.create({ data });

        if (regsiterMessage) {
            return "Chat created success";
        } else {
            return "Chat created error";
        }
    }
    async UserJoinChat(user_id: string, chat_id: string) {
        const existingChat = await prisma.chatMember.findFirst({
            where: { chatId: chat_id },
        });
        if (existingChat) {
            const existingUserInChat = await prisma.chatMember.findFirst({
                where: { userId: user_id, chatId: chat_id },
            });
            if (!existingUserInChat) {
                return prisma.chatMember.create({
                    data: { userId: user_id, chatId: chat_id },
                });
            } else {
                return "You already have a chat with this user";
            }
        } else {
            return "Chat does not exist";
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
