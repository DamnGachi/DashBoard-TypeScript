import express, { Application } from 'express';
import { json, raw, text, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes';

dotenv.config();

class App {
    public app: Application;
    public port;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.initialiseMiddleware();
    }
    private initialiseMiddleware(): void {
        this.app.use(router);

        this.app.set('view engine', 'ejs');
        
        this.app.use(
            cors({
                origin: '*',
                methods: '*',
                allowedHeaders: '*',
                credentials: true,
            })
        );
        this.app.use(raw());
        this.app.use(json());
        this.app.use(express.json());
        this.app.use(urlencoded({ extended: false }));
        this.app.use(text());
        this.app.get('/', (req, res) => {
            res.render('home');
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
