const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const express = require('express');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use('/json', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get("/json", (req, res) => {
  const response = { "message": "Hello json" }
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  const response = { "time": req.time }
  res.json(response);
})

app.get("/:word/echo", (req, res) => {
  res.json({"echo": req.params.word})
})

app.route("/name").get((req, res) => {
  const {first, last} = req.query;
  res.json({ "name": `${first} ${last}`})
}).post((req, res) => {
  const {first, last} = req.body;
  res.json({ "name": `${first} ${last}`});
})

module.exports = app;