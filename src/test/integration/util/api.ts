import request from "supertest";
import { app } from "../../../app";
import { User } from "../../../model/user";

export async function registerUser(user: User) {
    await request(app).post("/users/register").send(user);
}

export async function login(user: User) {
    return (await request(app).post("/users/login").send(user)).text;
}
