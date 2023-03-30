import express from "express";
import path from "path";

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
