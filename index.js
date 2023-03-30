import express from "express";
import path from "path";

const app = express(); // server created

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "VAIBHAV", age: 25 });
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

app.listen(5000, () => {
  console.log("server on port 5000");
});
