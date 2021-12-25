const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
//* Dummy Database
const users = [];

app.set("view-engine", "ejs");

//* So that we can access form fields in req object through req.body property
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Hritick" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/redirect");
  }
  console.log(users);
});

app.listen(3000);
