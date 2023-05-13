import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";


export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response) {
    const body = req.body

    try {
        const user = await createUser(body);

        return res.send("user created successfully")

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("account already exists")
        }
        return res.status(500).send(error)
    }
}
