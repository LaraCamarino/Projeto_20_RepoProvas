import * as testsRepository from "../repositories/testsRepository.js";
import { TypeNewTest } from "../types/testsTypes.js";

export async function insertNewTest(newTest: TypeNewTest) {
    const { name, pdfUrl, categoryId, teacherId, disciplineId } = newTest;

    const validCategory = await testsRepository.findCategoryById(categoryId);
    if (!validCategory) {
        throw {
            type: "not_found",
            message: "Category not found."
        };
    }

    const validTeacher = await testsRepository.findTeacherById(teacherId);
    if (!validTeacher) {
        throw {
            type: "not_found",
            message: "Teacher not found."
        };
    }

    const validDiscipline = await testsRepository.findDisciplineById(disciplineId);
    if (!validDiscipline) {
        throw {
            type: "not_found",
            message: "Discipline not found."
        };
    }

    const teacherDiscipline = await testsRepository.findTeacherDiscipline(teacherId, disciplineId);
    if (!teacherDiscipline) {
        throw {
            type: "not_found",
            message: "This teacher does not teach this discipline."
        };
    }

    await testsRepository.insertNewTest({
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId: teacherDiscipline.id
    })
}

export async function getTestsGroupedByTerms() {
    const tests = await testsRepository.getTestsGroupedByTerms();
    return tests;
}

export async function getTestsGroupedByTeacher() {
    const tests = await testsRepository.getTestsGroupedByTeacher();
    return tests;
}