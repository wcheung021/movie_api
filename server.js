const http = require('http');
const url = require("url");
const fs = require("fs");

  http.createServer((request, response) => {
  let addr = request.url,
    q = new URL (addr, "http://localhost:8080");
    filePath = "";
//create new sever

  fs.appendFile("log.txt", 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

    if (q.pathname.includes('documentation')){
      filePath = (__dirname + '/documentation.html');
    } else {
      filePath = 'index.html';
    }
    
    fs.readFile(filePath, (err,data)=>{
      if (err){
        console.log("error 404");
      }

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();
    });
  
  }) .listen(8080);
  console.log("My test sever is running on Port 8080.");

