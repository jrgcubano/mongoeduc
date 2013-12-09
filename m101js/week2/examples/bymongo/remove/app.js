var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw3' };

    db.collection('grades').remove(query, function(err, removed) {
        if(err) throw err;

        console.dir("Successfully updated " + removed + " documents!");

        return db.close();
    });
});
