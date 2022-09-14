import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import * as authRepository from "../repositories/authRepository.js";
import { IToken } from "../types/authTypes.js";

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        throw {
            type: "not_found",
            message: "No token was sent."
        };
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY) as IToken;

    const user = await authRepository.findUserById(userId);
    if (!user) {
        throw {
            type: "unauthorized",
            message: "Invalid token."
        };
    }

    res.locals.user = user;

    next();
}