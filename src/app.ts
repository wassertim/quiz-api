import express from "express";
import * as path from "path";
import cors from "cors";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { verify } from "./middleware/passport";
import { quizRouter, userRoute, quizAttemptRoute } from "./routes";
import { loginParams } from "./middleware/login.params";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/users", userRoute);
app.use("/profiles/:login/quizzes", loginParams, quizRouter);
app.use("/quiz-attempts", quizAttemptRoute);

passport.use(new BasicStrategy(verify));
