import express, { Application } from "express";
import { json, raw, text, urlencoded } from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "../routes";
import "./config/passport";
import { COOKIE_KEY } from "./utils/secrets";
import cookieSession from "cookie-session";
import passport from "passport";
import session from "express-session";
import { MemoryStore } from "express-session";

dotenv.config();

class App {
    public app: Application;
    public port;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.initialiseMiddleware();
        // this.GoogleinitialiseMiddleware();
    }

    // private GoogleinitialiseMiddleware(): void {
    //     // Setting up cookieSession
    // }

    private initialiseMiddleware(): void {
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
        this.app.use(router);

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
            res.render("home");
        });
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
