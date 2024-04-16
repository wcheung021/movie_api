const url = require("url");
    fs = require("fs");
    url = require("url");
// create shortcut to set multiple var at once.

    http.createServer((request, response)=>{
    let addr = request.url,
    q = new URL (addr, "http://" + request.headers.host),
    filePath = "";
})
//create new sever

fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

//append new information, new information to be appended and an error-handling function

if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);

console.log('My test server is running on Port 8080.');
