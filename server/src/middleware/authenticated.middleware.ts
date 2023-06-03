
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import createHttpError from "http-errors";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return next(createHttpError.Unauthorized("Access token is required"));
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(createHttpError.Unauthorized());
    }
    await verifyToken(token)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((error) => {
            next(createHttpError.Unauthorized(error.message));
        });
};

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.redirect("/auth/login");
    } else {
        next();
    }
};

export default auth;
