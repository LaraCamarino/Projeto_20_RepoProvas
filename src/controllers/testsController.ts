import { Request, Response } from "express";

import * as testsService from "../services/testsService.js";

export async function insertNewTest(req: Request, res: Response) {
    const newTest = req.body;

    await testsService.insertNewTest(newTest);
    res.status(201).send("Test added successfully.");
}