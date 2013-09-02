var helpers = require("./lib/html-fetcher-helpers.js");
var sitesPath = __dirname + "/../data/sites.txt";

helpers.readUrls(sitesPath, helpers.downloadUrls);