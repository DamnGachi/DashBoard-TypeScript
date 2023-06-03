import { z } from "zod";

export const createChatSchema = z.object({
    name: z.string(),
    link: z.string(),
    avatar: z.string(),
    description: z.string(),
    pinMessage: z.string(),
});

export const logMessageSchema = z.object({
    text: z.string(),
    entity: z.string(),
    userId: z.string(),
    chatRoomId: z.string(),
});

logMessageSchema.parse({
    text: "geralg from nigeria",
    entity: "photo",
    userId: "ieh34jq34jqokdjf",
    chatRoomId: "kewjU57nfDWFj757hjhn",
});

createChatSchema.parse({
    name: "Rude Python",
    link: "t.me/RudePython",
    avatar: "Nazis",
    description: "something",
    pinMessage: "something",
});

export type CreateChatRoom = z.infer<typeof createChatSchema>;
export type logMessage = z.infer<typeof logMessageSchema>;
