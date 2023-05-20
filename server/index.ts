import express, { Express } from 'express';
import { json, raw, text, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';



dotenv.config();
const port = process.env.PORT;
const app: Express = express();

app.set("view engine", "ejs");

app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true
}));

app.use(express.json());
app.use(json());
app.use(raw());
app.use(text());
app.use(urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.render("home");
});

app.use(router);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});