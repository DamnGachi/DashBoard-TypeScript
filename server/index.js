"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.raw)());
app.use((0, body_parser_1.text)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running.');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
