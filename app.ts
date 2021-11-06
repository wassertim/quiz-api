import express = require("express");
import * as path from "path";
import user from "./routes/user";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/users", user);

app.get('/home', (request, response, next)=>{
  response.json({ message: `Welcome to the home page!` });
});


