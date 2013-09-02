var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var fs = require('fs');
var url = require('url');

var headers = {
  'Content-Type': 'text/plain',
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports.router = function(request, response) {
  var urlObj = url.parse(request.url);
  var path = urlObj.path;
  var homeRegex = new RegExp('^/$');
  var siteRegex = new RegExp('\/\\w+\\.\\w+\\.\\w+');
  switch (true) {
    case (request.method === "OPTIONS"):
      console.log('were in the options call');
      response.writeHead(200, headers);
      response.end();
      break;
    case (request.method === "POST"):
      recPost(request, response);
      break;
    case homeRegex.test(path):
      readIndex(path, response);
      break;
    case siteRegex.test(path):
      readSites(path, response);
      break;
  default:
    response.writeHead(404, headers);
    response.end();

  }
};

var readIndex = function(url, response) {
  headers['Content-Type'] = 'text/html';
  response.writeHead(200, headers);
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};

var readSites = function(url, response) {
  if (!fs.existsSync(__dirname + '/../data/sites' + url)) {
    response.writeHead(404, headers);
    response.end();
  } else {
    response.writeHead(200, headers);
    fs.readFile(__dirname + '/../data/sites' + url, function(err, data) {
      if (err) {
        return err;
      }
      response.end(data.toString());
    });
  }
};

var recPost = function(request, response) {
  //get data from POST -- async
  //write content of POST data to data/sites.txt
  //if url is not already archived, redirect user to waiting page
  //if url is archived, redirect to our copy
  var data = "";

  request.on('data', function(chunk) {
    data += chunk;
  });

  request.on('end', function() {
    fs.appendFile(__dirname + '/..' + '/data/sites.txt',
      data.slice(4) + '\n', function(err) {
        if (err) {
          throw err;
        }
        console.log("success");
        response.writeHead(302, headers);
        response.end(data);
      });
  });

};
