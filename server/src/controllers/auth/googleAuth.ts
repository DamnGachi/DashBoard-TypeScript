import { Request, Response } from "express";
import UserDAL from "../../service/user";

class AuthController {
    async login(req: Request, res: Response) {
        try {
            res.render("login");
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
}

export default new AuthController();
