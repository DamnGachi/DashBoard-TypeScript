import express from "express";
import {
    createUserHandler,
} from "../src/controller/user.controller";

import {
    createUserSchema,
} from "../src/dto/user.schema";
import validateResource from "../src/middleware/validateResource";

const router = express.Router();

router.post(
    "/api/users",
    validateResource(createUserSchema),
    createUserHandler
);

export default router;