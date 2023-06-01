import express, { Application } from "express";
import { json, raw, text, urlencoded } from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "../routes";
import "./config/passport";
import { COOKIE_KEY, url } from "./utils/secrets";
import cookieSession from "cookie-session";
import passport from "passport";
import session from "express-session";
import { MemoryStore } from "express-session";
import { Server, Socket } from "socket.io";
import http from "http";
import * as redis from "redis";
import Sockets from "./sockets";

dotenv.config();

class App {
    public port;
    public app: Application;
    public io: Server;
    public server: http.Server;
    public redisClient: any;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.redisClient = redis.createClient({
            url,
        });
        this.port = process.env.PORT;
        this.initialiseMiddleware();
        this.setupSocketIO(); // Moved socket.io setup to a separate method
    }
    public setupSocketIO(): void {
        this.io.on("connection", (socket: Socket) => {
            console.log("a user connected : " + socket.id);

            socket.emit("message", "Hello " + socket.id);

            socket.on("disconnect", function () {
                console.log("socket disconnected : " + socket.id);
            });
        });
        Sockets(this.io);
    }
    private initialiseMiddleware(): void {
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(
            cookieSession({
                maxAge: 24 * 60 * 60 * 1000,
                keys: [COOKIE_KEY],
            })
        );

        // Initialize session middleware with a session store
        this.app.use(
            session({
                secret: COOKIE_KEY,
                resave: false,
                saveUninitialized: false,
                store: new MemoryStore(), // You can use a different session store implementation as per your requirements
            })
        );

        // Initialize passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.set("view engine", "ejs");

        this.app.use(
            cors({
                origin: "*",
                methods: "*",
                allowedHeaders: "*",
                credentials: true,
            })
        );
        this.app.use(raw());
        this.app.use(json());
        this.app.use(express.json());
        this.app.use(urlencoded({ extended: false }));
        this.app.use(text());
        this.app.get("/", (req, res) => {
            res.render("chat");
        });

        this.app.use(router);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(
                `⚡️[server]: Server is running at http://localhost:${this.port}`
            );
        });
    }
}

export default App;
