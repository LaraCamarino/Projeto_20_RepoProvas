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
    where: { teacherId, disciplineId }
  })
}

export async function insertNewTest(newTest: TypeTestNoID) {
  return prisma.test.create({
    data: newTest,
  });
}

export async function getTestsGroupedByTerms() {
  return prisma.term.findMany({
    orderBy: { number: "asc" },
    select: {
      number: true,
      disciplines: {
        distinct: ["name"],
        select: {
          name: true,
          teacherDisciplines: {
            select: {
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: { select: { name: true } },
                  teacherDiscipline: { select: { teacher: { select: { name: true } } } }
                }
              }
            }
          }
        }
      }
    }
  });
}

export async function getTestsGroupedByTeacher() {
  return prisma.teacher.findMany({
    orderBy: { name: "desc" },
    select: {
      name: true,
      teacherDisciplines: {
        select: {
          discipline: { select: { term: { select: { number: true } } } },
          tests: {
            select: {
              category: { select: { name: true }, },
              id: true,
              name: true,
              pdfUrl: true,
              teacherDiscipline: { select: { discipline: { select: { name: true } } } }
            }
          }
        }
      }
    }
  });
}
