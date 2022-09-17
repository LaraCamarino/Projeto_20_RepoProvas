import supertest from "supertest";
import dotenv from "dotenv";

import app from "../src/app";
import prisma from "../src/dbStrategy/database";
import * as userFactory from "./factories/userFactory";
import * as testFactory from "./factories/testFactory";

dotenv.config();
console.log("Database = " + process.env.DATABASE_URL);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users";`;
    await prisma.$executeRaw`TRUNCATE TABLE "tests";`;
});

describe("Test POST /sign-up", () => {
    it("Should create an user and return statusCode 201", async () => {
        const newUser = userFactory.createNewUser();

        const result = await supertest(app).post("/sign-up").send(newUser);
        expect(result.status).toEqual(201);

        const createdUser = await prisma.user.findFirst({
            where: { email: newUser.email }
        });
        expect(createdUser).not.toBeNull();
    });

    it("If password and confirmPassword are not the same, should return statusCode 422", async () => {
        const newUser = userFactory.newUserWithWrongPassword();

        const result = await supertest(app).post("/sign-up").send(newUser);
        expect(result.status).toEqual(422);
    });

    it("If e-mail is already in use, should return statusCode 409", async () => {
        const newUser = userFactory.createNewUser();

        await supertest(app).post("/sign-up").send(newUser);

        const result = await supertest(app).post("/sign-up").send(newUser);
        expect(result.status).toEqual(409);
    });
});

describe("Test POST /sign-in", () => {
    it("Should login the user, return a token and statusCode 200", async () => {
        const user = userFactory.createNewUser();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(result.status).toEqual(200);
        expect(result.body.token).not.toBeNull();
    });

    it("If e-mail is incorrect, should return statusCode 401", async () => {
        const user = userFactory.createNewUser();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send({ email: "wrong@email.com", password: user.password });
        expect(result.status).toEqual(401);
    });

    it("If password is incorrect, should return statusCode 401", async () => {
        const user = userFactory.createNewUser();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send({ email: user.email, password: "wrong_password" });
        expect(result.status).toEqual(401);
    });
});

describe("Test POST /tests", () => {
    it("Should create a new test and return statusCode 201", async () => {
        const user = userFactory.createNewUser();
    
        await supertest(app).post("/sign-up").send(user);

        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });
        const token = loggedUser.body.token;

        expect(loggedUser.status).toEqual(200);
        expect(token).not.toBeNull();

        const newTest = testFactory.createNewTest(1, 1, 1);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${token}` }).send(newTest);
        expect(result.status).toEqual(201);
    });

    it("If token is invalid, should return statusCode 401", async () => {
        const token = "invalid_token";
        const newTest = testFactory.createNewTest(1, 1, 1);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${token}` }).send(newTest);
        expect(result.status).toEqual(401);
    });

    it("If categoryId is invalid, should return statusCode 404", async () => {
        const user = userFactory.createNewUser();
    
        await supertest(app).post("/sign-up").send(user);

        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });
        const token = loggedUser.body.token;

        expect(loggedUser.status).toEqual(200);
        expect(token).not.toBeNull();

        const newTest = testFactory.createNewTest(0, 1, 1);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${token}` }).send(newTest);
        expect(result.status).toEqual(404);
    });   

    it("If teacherId is invalid, should return statusCode 404", async () => {
        const user = userFactory.createNewUser();
    
        await supertest(app).post("/sign-up").send(user);

        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });
        const token = loggedUser.body.token;

        expect(loggedUser.status).toEqual(200);
        expect(token).not.toBeNull();

        const newTest = testFactory.createNewTest(1, 0, 1);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${token}` }).send(newTest);
        expect(result.status).toEqual(404);
    });

    it("If disciplineId is invalid, should return statusCode 404", async () => {
        const user = userFactory.createNewUser();
    
        await supertest(app).post("/sign-up").send(user);

        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });
        const token = loggedUser.body.token;

        expect(loggedUser.status).toEqual(200);
        expect(token).not.toBeNull();

        const newTest = testFactory.createNewTest(1, 1, 0);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${token}` }).send(newTest);
        expect(result.status).toEqual(404);
    });

    it("If teacherDiscipline relation is invalid, should return statusCode 404", async () => {
        const user = userFactory.createNewUser();
    
        await supertest(app).post("/sign-up").send(user);

        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });
        const token = loggedUser.body.token;

        expect(loggedUser.status).toEqual(200);
        expect(token).not.toBeNull();

        const newTest = testFactory.createNewTest(1, 2, 1);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${token}` }).send(newTest);
        expect(result.status).toEqual(404);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});