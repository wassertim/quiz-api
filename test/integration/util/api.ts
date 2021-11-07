import request from "supertest";
import {app} from "../../../app";

export async function registerUser(user: { password: string; login: string }) {
  await request(app).post("/users/register").send(user);
}
