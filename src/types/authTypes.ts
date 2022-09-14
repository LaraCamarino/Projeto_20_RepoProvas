import { User } from "@prisma/client";

export type TypeNewUser = Omit<User, "id">;

export interface IToken {
    userId: number;
}