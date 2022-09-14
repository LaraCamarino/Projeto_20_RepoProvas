import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import * as authRepository from "../repositories/authRepository.js";
import { TypeNewUser } from "../types/authTypes.js";

export async function signUp(newUser: TypeNewUser) {
    
    const emailInUse = await authRepository.findUserByEmail(newUser.email);
    if (emailInUse) {
        throw {
            type: "conflict",
            message: "This e-mail is alrealdy in use."
        };
    }

    const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

    await authRepository.insertNewUser({ ...newUser, password: encryptedPassword });
}

export async function signIn(user: TypeNewUser) {
    const existingUser = await verifyExistingUser(user.email, user.password);
    const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET_KEY);

    return token;
}

async function verifyExistingUser(email: string, password: string) {
    const existingUser = await authRepository.findUserByEmail(email);
    if (!existingUser) {
        throw {
            type: "unauthorized",
            message: "Incorrect e-mail or password."
        };
    }

    const verifyPassword = bcrypt.compareSync(password, existingUser.password);
    if (!verifyPassword) {
        throw {
            type: "unauthorized",
            message: "Incorrect e-mail or password."
        };
    }

    return existingUser;
}