const url = require('url');
const http = require('http');

http.createServer(function (req, res) {
    const sampleUrl = 'http://www.google.com/search?q=nodejs';
    var urlObj = url.parse(sampleUrl,true);
    res.write("Host: " + urlObj.host + '\n');
    res.write("Path: " + urlObj.pathname + '\n');
    res.write("Search: " + urlObj.search + '\n');
    res.write("Query: " + urlObj.query.q + '\n');
    res.end();
}).listen(3000);