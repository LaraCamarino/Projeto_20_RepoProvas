import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateNewTest(req: Request, res: Response, next: NextFunction) {
    const newTest = req.body;

    const newTestSchema = joi.object({
        name: joi.string().required(),
        pdfUrl: joi.string().uri().required(),
        categoryId: joi.number().required(),
        teacherId: joi.number().required(),
        disciplineId: joi.number().required()
    });

    const validation = newTestSchema.validate(newTest, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }

    next();
}