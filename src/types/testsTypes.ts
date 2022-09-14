import { Test } from "@prisma/client";

export type TypeNewTest = Omit<Test, "id" | "teacherDisciplineId"> & {
    teacherId: number;
    disciplineId: number
};

export type TypeTestNoID = Omit<Test, "id">;