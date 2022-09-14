import prisma from "../dbStrategy/database.js";

import { TypeTestNoID } from "../types/testsTypes.js";

export async function findCategoryById(categoryId: number) {
    return prisma.category.findUnique({
        where: { id: categoryId }
      });
}

export async function findTeacherById(teacherId: number) {
    return prisma.teacher.findUnique({
        where: { id: teacherId }
      });
}

export async function findDisciplineById(disciplineId: number) {
    return prisma.discipline.findUnique({
        where: { id: disciplineId }
      });
}

export async function findTeacherDiscipline(teacherId: number, disciplineId: number) {
    return prisma.teacherDiscipline.findFirst({
        where: { teacherId, disciplineId}
    })
}

export async function insertNewTest(newTest: TypeTestNoID) {
    return prisma.test.create({
      data: newTest,
    });
  }