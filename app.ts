import express = require("express");
import * as path from "path";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/home', (request, response)=>{
  response.json({ message: `Welcome to the home page!` });
});


