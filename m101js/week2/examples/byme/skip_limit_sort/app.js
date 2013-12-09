var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var grades = db.collection('grades');
    var options = { 'skip' : 1,
                    'limit' : 4,
                    'sort' : [['grade', 1], ['student', -1]] };
    var cursor = grades.find({}, {}, options);

    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc);
    });
});