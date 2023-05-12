import { FastifyInstance } from "fastify";
import { registerUserController } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    server.post('/api/users', registerUserController)
}

export default userRoutes;