var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { };
    var operator = { '$unset' : { 'date_returned' : '' } };
    var options = { 'multi' : true };

    db.collection('grades').update(query, operator, options, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " documents!");

        return db.close();
    });
});
