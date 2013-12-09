var MongoClient = require('mongodb').MongoClient;

console.dir("Start connection with db");
// Open the connection to the server
MongoClient.connect('mongodb://localhost:27017/test', function(err, db){

	if(err) throw err;

	// Find one document in our collection
	db.collection('coll').findOne({}, function(err, doc){

		if(err) throw error;

		// Print the result
		console.dir(doc);

		// Close the db
		db.close();
	});

	// Declare success
	console.dir("Called findOne!");
});

