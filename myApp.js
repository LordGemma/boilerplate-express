const path = require("path");
const express = require('express');
const app = express();

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

module.exports = app;