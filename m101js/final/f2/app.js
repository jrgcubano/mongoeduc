var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/enron', function(err, db) {
    if(err) throw err;

    db.collection('messages', function(err, collection) {
        if(err) throw err;  

        collection.aggregate([       
            // Remove duplicates 
            {$unwind: '$headers.To'}, 
            {$group: {_id : '$_id', From : {$first: '$headers.From'}, To: {$addToSet : '$headers.To'}}},
            // Continue
            {$unwind: '$To'},
            {$group: {_id: { From:'$From', To:'$To' }, total : {$sum : 1}}},
            {$sort: { total: -1}},
            {$limit: 1},
            {$project: {_id:0, From: '$_id.From', To : '$_id.To', Total: '$total'}} 
        ],
        function(err, items){
            if(err) throw err;
            console.log(items);   
        });
        //return db.close();
    });
});