var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017, {});

var client = new mongo.Db('albums', server);

client.open(function(err, client) {
  if(err) return err;
  client.createCollection('albums', function(err, collection) {
    console.log('made a collection bitches!!!');
    var album1 = {
      title: 'Dark Side',
      artist: 'Pink Floyd'
    };
    var album2 = {
      title: 'Goodbye Yellow Brick Road',
      arist: 'Elton John'
    };
    collection.ensureIndex({title: 1}, {unique: true, dropDups: true});

    collection.insert(album1, function(err, album) {
      console.log('we added an album to the collection!');
    });
    collection.insert(album2, function(err, album) {
      console.log('we added an album to the collection!');
    });
    var allItems = collection.find({});
    collection.remove({title: 'Goodbye Yellow Brick Road'}, function() {
    });
    collection.remove({title: 'Dark Side'});

    collection.insert([{title: 'Yoshimi', artist: 'The Flaming Lips'}, {title: '1972', artist: 'Josh Rouse'}]);

    allItems.each(function(err, album) {
      console.log(album);
      client.close();
    });
  });
});

    //can I refactor to have bulk insert?


