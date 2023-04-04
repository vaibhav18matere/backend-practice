import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const app = express(); // server created

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

const isAuthenticatedCheck = async (req, res, next) => {
  console.log(req.user);

  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "jwtTimePassSecreatTempBanawalaAahe");
    console.log(decoded);

    req.user = await User.findById(decoded._id);

    next();
  } else {
    res.render("login");
  }
};

app.get("/", isAuthenticatedCheck, (req, res) => {
  res.render("logout", { name: req.user.name });
});

app.post("/login", async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  const user = await User.create({
    name,
    email,
  });

  const token = jwt.sign(
    {
      _id: user._id,
    },
    "jwtTimePassSecreatTempBanawalaAahe"
  );

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 40 * 1000),
  });

  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "formDB",
  })
  .then(() => console.log("connectiong with db successful!!!"))
  .catch(() => console.log("db not connected"));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
app.listen(5000, () => {
  console.log("server on port 5000");
});
