import express from "express";
import path from "path";

import mongoose from "mongoose";
const app = express(); // server created

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "VAIBHAV", age: 25 });
});

// make route for success
app.get("/success", (req, res) => {
  res.render("success");
});

let tempUsers = [];

// to access static path / folder, we use app.use() and add middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  // console.log(req.body);
  tempUsers.push({ userName: req.body.name, userEmail: req.body.email });
  // res.render("success");
  //to make a simple redirect
  res.redirect("/success");
  console.log(tempUsers);
});

// get users data on separate file
app.get("/users", (req, res) => {
  res.json({
    tempUsers,
  });
});

app.post("/contact", (req, res) => {
  tempUsers.push({ userName: req.body.name, userEmail: req.body.email });
  res.redirect("/success");
});

// app.get("/user", (req, res) => {
//   res.json({
//     name: "vaibhav",
//     age: 25,
//   });
// });

// app.get("/blog", (req, res) => {
//   const pathLocation = path.resolve();
//   // console.log(path.join(pathLocation, "./index.html"));
//   res.sendFile(path.join(pathLocation, "./index.html"));
// });

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "formDB",
  })
  .then(() => console.log("connectiong with db successful!!!"))
  .catch(() => console.log("db not connected"));

app.get("/add", (req, res) => {
  res.send("connected mongodb");
});

app.listen(5000, () => {
  console.log("server on port 5000");
});
