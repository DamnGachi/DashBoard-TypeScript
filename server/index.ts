// import dotenv from "dotenv";
import Fastify from "fastify";
import userRoutes from "./src/modules/user/user.route"

// dotenv.config();
// const port = process.env.PORT;
const app = Fastify();



app.get('/', async function (request, response) {
    return { status: "Ok" }
})


async function main() {
    app.register(userRoutes, { prefix: "don't be a dramatic" })
    try {
        app.listen(3000, "0.0.0.0");
        console.log(`⚡️[server]: Server is running at http://localhost:${3000}`)
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}

main()
