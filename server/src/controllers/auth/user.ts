import { Request, Response } from "express";
import UserDAL from "../../service/user";

class RegistryController {
    async createUser(req: Request, res: Response) {
        try {
            const result = await UserDAL.create(req.body);
            res.send(result).status(200);
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
}

export default new RegistryController();