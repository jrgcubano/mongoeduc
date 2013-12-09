var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw2' };

    db.collection('grades').findOne(query, function(err, doc) {
        if(err) throw err;

        doc['date_returned'] = new Date();

        db.collection('grades').save(doc, function(err, saved) {
            if(err) throw err;

            console.dir("Successfully saved " + saved + " document!");

            return db.close();
        });
    });
});
