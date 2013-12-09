var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
    if(err) throw err;

    db.collection('posts', function(err, collection) {
        if(err) throw err;  

        collection.aggregate([
            /* unwind by comments */
            {$unwind:"$comments"},
            /* group by author counting comments */
            {$group: {'_id': "$comments.author", 'count': {$sum: 1} }},
            /* sort by count */
            {$sort: {'count': -1}},
            {$limit : 5},
            {$project : {_id:0, 'author':'$_id', 'count':1}}
        ],
        function(err, items){
            if(err) throw err;
            console.log(items);    
        });
        //return db.close();
    });
});
