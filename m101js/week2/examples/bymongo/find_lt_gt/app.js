var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'student' : 'Joe', 'grade' : { '$gt' : 80, '$lt' : 95 } };

    db.collection('grades').find(query).each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.dir(doc);
    });
});
