import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post('/api/users/register', registerUserHandler)
    server.post('/api/users/login',
     {
        schema: {
            body: $ref('loginSchema'),
            response: {
                200: $ref("loginResponseSchema")
            },
        },
    },
        loginHandler
    );
}

export default userRoutes;