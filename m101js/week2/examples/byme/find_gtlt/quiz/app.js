var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    /* TODO - Get all documents with a grade between 69 and 80 */
    var query = { 'grade' : { '$gt' : 69, '$lt' : 80} };

    db.collection('grades').find(query).each(function(err, doc){
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc);
    });
}); 