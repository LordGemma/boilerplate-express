const path = require("path");
const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get("/json", (req, res) => {
  res.json({"message": "Hello json"});
})

 module.exports = app;