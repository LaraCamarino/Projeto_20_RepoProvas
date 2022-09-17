import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const newUser = req.body;
    delete newUser.confirmPassword;

    await authService.signUp(newUser);
    res.status(201).send("User registered successfully.");
}

export async function signIn(req: Request, res: Response) {
    const user = req.body;

    const token = await authService.signIn(user);
    res.status(200).send({ token });
}