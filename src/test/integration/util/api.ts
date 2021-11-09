import request from "supertest";
import { app } from "../../../app";
import { User } from "../../../model/user.model";

export async function registerUser(user: User) {
    await request(app).post("/users/register").send(user);
}

export async function login(user: User) {
    return (await request(app).post("/users/login").send(user)).text;
}

export async function createQuiz(login: string, token: string) {
    const response = await request(app)
        .post(`/profiles/${login}/quizzes`)
        .set({ Authorization: token })
        .send({
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "2",
                            isCorrect: true,
                        },
                        {
                            text: "15",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        });

    return response.body;
}
