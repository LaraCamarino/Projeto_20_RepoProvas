import { Request, Response } from "express";

import * as testsService from "../services/testsService.js";

export async function insertNewTest(req: Request, res: Response) {
    const newTest = req.body;

    await testsService.insertNewTest(newTest);
    res.status(201).send("Test added successfully.");
}

export async function getTestsGroupedByTerms(req: Request, res: Response) {
    const tests = await testsService.getTestsGroupedByTerms();

    res.status(200).send(tests);
}

export async function getTestsGroupedByTeacher(req: Request, res: Response) {
    const tests = await testsService.getTestsGroupedByTeacher();

    res.status(200).send(tests);
}