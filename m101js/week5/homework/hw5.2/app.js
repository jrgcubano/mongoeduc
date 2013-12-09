var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/hw52', function(err, db) {
    if(err) throw err;

    db.collection('zips', function(err, collection) {
        if(err) throw err;  

        collection.aggregate([
            {$group: {'_id': {'state':"$state", 'city':"$city"}, pop:{$sum: "$pop"} }},
            {$match: {'_id.state': {$in: ["CA","NY"]},'pop': {$gt : 25000}}},
            {$group: {'_id' : null, "average_pop": {"$avg" : "$pop"} }}
        ],
        function(err, items){
            if(err) throw err;
            console.log(items);   
        });
        //return db.close();
    });
});