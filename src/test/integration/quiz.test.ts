import { initDatabase } from "./util/init.db";
import { login, registerUser } from "./util/api";
import request from "supertest";
import { app } from "../../app";
import { constants } from "http2";
import { Operation } from "express-openapi-validate/dist/OpenApiDocument";
import { openapi } from "./util/openapi";

describe("Register User API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should create a quiz", async () => {
        const [method, path] = ["post" as Operation, "/quizzes"];
        const token = await login(user);

        const response = await request(app)
            [method](path)
            .set({ Authorization: token })
            .send({
                questions: [
                    {
                        questionText: "what is the answer to life the universe and everything",
                        questionScore: 5,
                        answers: [
                            {
                                text: "42",
                                isCorrect: true
                            },
                            {
                                text: "41",
                                isCorrect: false
                            },
                        ],
                    },
                ],
            });
        
        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
    });
});
