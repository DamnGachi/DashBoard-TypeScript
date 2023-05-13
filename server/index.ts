import express from "express";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.get("port");

app.listen(port, () => {
    console.info(`App started at http://localhost:${port}`);

    // connectToDb();
});