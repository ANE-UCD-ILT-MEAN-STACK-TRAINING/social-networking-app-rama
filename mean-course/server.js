// create a server variable
/*const http = require("http");
const server = http.createServer((req, res) => {
  res.end("This is my first response");
});

const port = process.env.PORT || "3000";

console.log("Running on port " + port);
// listen at a port
server.listen(port);*/

var express = require("express");
var app = new express();

const port = process.env.PORT || "3000";

app.get("/", function (req, res) {
  res.send("Hello World from Express");
});

app.listen(port, function () {
  console.log("Running on port " + port);
});

