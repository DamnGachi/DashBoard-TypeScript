"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import AuthController from "../src/controllers/Auth/user.ts";
const router = (0, express_1.default)();
router.get('/', (req, res) => {
    res.send("HELLO");
});
// router.get('/api/service/auth/sync', AuthController.sync);
// router.post('/api/service/auth/', AuthController.login);
exports.default = router;
