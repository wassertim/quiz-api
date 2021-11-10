import {Router} from "express";
import {register, login} from "../controllers/user.controller";

export const userRoute = Router()
    .post("/register", register)
    .post("/login", login);
