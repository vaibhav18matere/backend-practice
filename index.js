// const http = require("http");
// const pageVar = require("./fileBasedModuleEx");
//old way of importing

//new way of importing => using Modules => needs extension
import http from "http";
import blogSub from "./fileBasedModuleEx.js"; //default export
import { percentScore } from "./fileBasedModuleEx.js"; // named export
import fs from "fs";
import path from "path";

console.log(path.dirname("/route/basicAuth/index.js"));
console.log(path.basename("/home/login/app.html"));

const server = http.createServer((req, res) => {
  // console.log("check server");
  // console.log(req.url);
  //   res.end("ending unlimited loading");
  // res.end("<h1>ending unlimited loading</h1>");

  if (req.url === "/") {
    fs.readFile("./index.html", (err, home) => {
      res.end(home);
    });
  } else if (req.url === "/projects") {
    res.end(`Projects ${percentScore()}`);
  } else if (req.url === "/blogs") {
    res.end(`Blogs subjects are ${blogSub}`);
  } else {
    res.end(`Page not found`);
  }
});

server.listen(5000, () => {
  console.log("server is getting listen here");
});
