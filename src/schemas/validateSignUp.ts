import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateSignUp(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;

    const newUserSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).required(),
        confirmPassword: joi.string().valid(joi.ref("password")).required()
    });

    const validation = newUserSchema.validate(newUser, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }
    
    next();
}