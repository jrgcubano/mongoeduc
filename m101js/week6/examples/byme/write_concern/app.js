client = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017,localhost:27018,localhost:27019/course?w=1", function(err, db) {
    if (err) throw err;

    // Write concert of 1
    db.collection("repl").insert({ 'x' : 1 }, function(err, doc) {
            if (err) throw err;
	    console.log(doc);
    
	    // Write concert of 2
            db.collection("repl").insert({ 'x' : 2 }, { 'w' : 2 }, function(err, doc) {
	                if (err) throw err;
	                console.log(doc);
	                db.close();
	    });
     });
});

