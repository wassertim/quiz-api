import { constants } from "http2";
import { app } from "../../../app";
import { registerUser } from "../util/api";
import { initDatabase } from "../util/init.db";
import request from "supertest";

describe("Login User API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should login user", async () => {
        const response = await request(app).post("/users/login").send(user);

        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
        expect(response.text).toBe("Basic bGF1cmE6bXlwYXNzd29yZA==");
    });
    test("Should return BAD_REQUEST when invalid user", async () => {
        const response = await request(app).post("/users/login").send({ login: "laura" });

        expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.text).toBe("User data is not valid");
    });
    test("Should return UNAUTHORIZED when password is wrong", async () => {
        const { login } = user;
        const response = await request(app).post("/users/login").send({ login, password: "wrong" });

        expect(response.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
        expect(response.text).toBe("Username or password are incorrect");
    });
});
