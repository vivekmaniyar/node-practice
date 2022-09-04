const express = require("express");
const session = require("express-session");
const filestore = require("session-file-store")(session);
const path = require("path");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Creating session
app.use(session({
	name: "session-id",
	secret: "FileSession",
	saveUninitialized: false,
	resave: false,
	store: new filestore()
}))

app.set('view engine','ejs');

app.get("/", (req, res) => {
    if(!req.session.user){
        res.render('login');
    }else{
        res.render('index');
    }
});

app.post("/login", (req, res) => {
    console.log(req.body);
    if(req.body.username === "admin" && req.body.password === "admin"){
        req.session.user = "admin";
        res.render("index");
    }else{
        console.log("Invalid username or password");
        res.redirect("/");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(3000, () => {
	console.log("Server is Starting")
})