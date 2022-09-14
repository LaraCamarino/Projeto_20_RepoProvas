import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateSignIn(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const validation = userSchema.validate(user, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }

    next();
}