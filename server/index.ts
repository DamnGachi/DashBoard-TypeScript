import { connectProducer, disconnectFromKafka } from "./src/utils/kafka";
import express from "express";
import router from "./routes/index";
import config from "config";
import { connectToDb } from "./src/database/db";
require("dotenv").config();

const app = express();

app.use(express.json());


app.use(router);
connectToDb();

connectProducer();

const port = config.get("port");

app.listen(port, () => {
    console.info(`App started at http://localhost:${port}`);

    // connectToDb();
});