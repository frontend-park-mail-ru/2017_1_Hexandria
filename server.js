"use strict";

const express = require("express");

const app = express();
app.disable("x-powered-by");

const path = require("path");

app.use(function(req, res, next){
    console.log("%s %s", req.method, req.url);
    next();
});

app.use("/", express.static("dist"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});


const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
    console.log("Listening on port %s", port);
});
