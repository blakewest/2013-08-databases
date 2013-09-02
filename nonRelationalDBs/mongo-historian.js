var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017, {w: 'majority'});

var client = new mongo.Db('archive', server);


client.open(function(err, client) {
  console.log('We connected to the DB');
  if (err) return err;
  client.createCollection('archive', function(err, collection) {
    console.log('Made a collection, bitches!!!');
    var testDoc = {
      url: 'www.google.com',
      pageSource: '<html>woot</html>'
    };
    collection.ensureIndex({url: 1}, {unique: true, dropDups: true});

    collection.insert(testDoc, function(err, doc) {
      console.log('we added the test Doc!');
      client.close();
    });
  });
});

