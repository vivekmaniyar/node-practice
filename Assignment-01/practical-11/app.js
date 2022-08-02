const path = require("path");
const express = require("express");
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});