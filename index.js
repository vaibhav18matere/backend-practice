import express from "express";

const app = express(); // server created

app.listen(5000, () => {
  console.log("server on port 5000");
});
