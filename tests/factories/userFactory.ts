import { faker } from "@faker-js/faker";

export function createNewUser() {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
    };
}

export function newUserWithWrongPassword() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password()
    };
}
