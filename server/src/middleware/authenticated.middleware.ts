// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/token";
// import createHttpError from "http-errors";
// import jwt, { JsonWebTokenError } from 'jsonwebtoken';
// import Token from "../utils/interfaces/token"

// async function authenticatedMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> {
//   const bearer = req.headers.authorization;

//   if (!bearer || !bearer.startsWith('Bearer ')) {
//     return next(createHttpError(401, 'Unauthorized'));
//   }

//   const accessToken = bearer.split('Bearer ')[1].trim();
//   try {
//     const payload: Token | JsonWebTokenError = await verifyToken(
//       accessToken
//     );

//     if (payload instanceof JsonWebTokenError) {
//       return next(createHttpError(401, 'Unauthorized'));
//     }

//     const user = await prisma?.user.findUnique({ where: { id: payload.id } });
//     if (!user) {
//       return next(createHttpError(401, 'Unauthorized'));
//     }

//     req.user = user;

//     return next();
//   } catch (error) {
//     return next(createHttpError(401, 'Unauthorized'));
//   }
// }

// const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user) {
//     res.redirect("/auth/login");
//   } else {
//     next();
//   }
// };

// export default authenticatedMiddleware;
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
