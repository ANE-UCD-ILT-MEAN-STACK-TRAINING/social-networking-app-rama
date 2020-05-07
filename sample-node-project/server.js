const http = require("http");
const server = http.createServer((req, res) => {
    res.end('Response from my server'); 
   
  });
  server.listen(3083);
