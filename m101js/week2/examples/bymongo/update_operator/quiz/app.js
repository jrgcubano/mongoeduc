var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw1' };
    var operator = { 'assignment' : 'hw2', '$set' : { 'date_graded' : new Date() } };

    db.collection('grades').update(query, operator, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " document!");

        return db.close();
    });
});
