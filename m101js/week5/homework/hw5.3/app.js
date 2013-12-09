var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/hw53', function(err, db) {
    if(err) throw err;

    db.collection('grades', function(err, collection) {
        if(err) throw err;  

        collection.aggregate([
            {$unwind: '$scores'},
            {$match: {'scores.type': {$in: ["exam","homework"]} }},
            {$group: {'_id': {'class_id':'$class_id', 'student_id':'$student_id'},
                      avg_student : {"$avg": "$scores.score"} }},
            {$group: {'_id': '$_id.class_id', 
                      avg_class : {"$avg": "$avg_student"} }},
            {$sort: {'avg_class': -1} },
            {$project: {_id:0, 'class_id': '$_id', avg_class : 1}}, 
            {$limit: 1}
        ],
        function(err, items){
            if(err) throw err;
            console.log(items);   
        });
        //return db.close();
    });
});