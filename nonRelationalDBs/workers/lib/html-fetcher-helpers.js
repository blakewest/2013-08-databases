var fs = require('fs');
var http = require('http-get');

module.exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
    cb(data.toString());
  });
};

module.exports.downloadUrls = function(urls){
  var urlsArray = urls.split('\n');
  var sitesPath = __dirname + "/../../data/sites/";
  for (var url = 0; url < urlsArray.length; url++) {
  http.get(urlsArray[url], sitesPath + urlsArray[url], function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log("File downloaded at " + result.file + "!!!");
    }
  });

  }
};
