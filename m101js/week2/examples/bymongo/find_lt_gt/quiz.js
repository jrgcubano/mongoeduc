var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    /* BEGIN STUDENT CODE */
    var query = { 'grade' : { '$gt' : 80, '$lt' : 90 } };
    /* END STUDENT CODE */

    db.collection('grades').find(query).each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.dir(doc);
    });
});
