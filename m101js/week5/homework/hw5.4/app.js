var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/hw52', function(err, db) {
    if(err) throw err;

    db.collection('zips', function(err, collection) {
        if(err) throw err;  

        collection.aggregate([
            /* Using projection */
            //{$project: {_id:1, first_char: {$substr : ["$city",0,1]}, pop:1 }}, 
            //{$match: {'first_char': {$in: ['0','1','2','3','4','5','6','7','8','9']} }},
            /* Using regex */
            {$match: {'city': {$regex: '^[0-9]'} }},
            /* Result */
            {$group: {'_id': null, population:{$sum: "$pop"} }},
            {$project: {_id:0, "population": 1}}
        ],
        function(err, items){
            if(err) throw err;
            console.log(items);   
        });
        //return db.close();
    });
});