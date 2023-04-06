const sessions = require("express-session");
const express = require("express");
const app = express();
app.use(
    sessions({
        secret: "bhimanikevin",
        saveUninitialized: true,
        resave: false,
    })
);



const authentication=async(req,res,next)=>{

    if (!req.session.email) {
        res.render("login", { msg: "" })
    }
    next();
}

module.exports = authentication;