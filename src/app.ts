import express from "express";
import * as path from "path";
import cors from "cors";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { verify } from "./passport/verify";
import user from "./routes/user";
import quiz from "./routes/quiz";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/users", user);
app.use("/quizzes", quiz);

passport.use(new BasicStrategy(verify));
