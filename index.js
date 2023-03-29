import express from "express";
import path from "path";

const app = express(); // server created

app.listen(5000, () => {
  console.log("server on port 5000");
});

app.get("/", (req, res) => {
  res.send("hello there");
  // res.sendStatus(307);
});

app.get("/user", (req, res) => {
  res.json({
    name: "vaibhav",
    age: 25,
  });
});

app.get("/blog", (req, res) => {
  const pathLocation = path.resolve();
  // console.log(path.join(pathLocation, "./index.html"));
  res.sendFile(path.join(pathLocation, "./index.html"));
});
