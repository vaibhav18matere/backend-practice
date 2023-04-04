import express from "express";
import path from "path";

import mongoose from "mongoose";
const app = express(); // server created

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(req.cookies);
});

app.post("/login", (req, res) => {
  res.cookie("token", "cookieIsThere", {
    httpOnly: true,
    // expires: new Date(Date.now() + 40 * 1000),
  });
  res.redirect("/");
});

// make route for success
app.get("/success", (req, res) => {
  res.render("success");
});

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

app.post("/contact", async (req, res) => {
  const { name, email } = req.body;

  await userInfo.create({ name, email });
  res.redirect("/success");
});

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "formDB",
  })
  .then(() => console.log("connectiong with db successful!!!"))
  .catch(() => console.log("db not connected"));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const userInfo = mongoose.model("Users", messageSchema);

app.get("/add", async (req, res) => {
  await userInfo.create({
    name: "Test Credentials",
    email: "test123@gmail.com",
  });
  res.send("connected mongodb - now schema is created");
  // go to "/add" url and check compass data is there after reloading
});

app.listen(5000, () => {
  console.log("server on port 5000");
});
