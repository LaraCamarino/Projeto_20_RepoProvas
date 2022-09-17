import { faker } from "@faker-js/faker";

export function createNewTest(categoryId: number, teacherId: number, disciplineId: number) {
    return {
        name: faker.word.noun() ,
        pdfUrl: faker.internet.url() ,
        categoryId,
        teacherId,
        disciplineId, 
    }
}