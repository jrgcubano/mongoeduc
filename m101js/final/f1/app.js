var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/enron', function(err, db) {
    if(err) throw err;

    db.collection('messages', function(err, collection) {
        if(err) throw err;  

        // Solution 1
        collection.find( {'headers.From': 'andrew.fastow@enron.com', 
                          'headers.To' : 'jeff.skilling@enron.com'}).count(
                          function(err, count){
                            if(err) throw err;
                            console.log(count);
        });

        // Solution 2
        // collection.find( {'headers.From': { $in:['andrew.fastow@enron.com']}, 
        //                   'headers.To' : 'jeff.skilling@enron.com'}).count(
        //                   function(err, count){
        //                     if(err) throw err;
        //                     console.log(count);
        // });

        // Solution 3
        // collection.aggregate([
        //     {$match: {'headers.From': "andrew.fastow@enron.com" }},
        //     {$unwind: '$headers.To'},
        //     {$match: {'headers.To': 'jeff.skilling@enron.com' }}, // test : john.lavorato@enron.com 
        //     {$group: {'_id': null, total_send : {"$sum": 1} }},            
        //     {$project: {_id:0, total_send : 1}} 
        // ],
        // function(err, items){
        //     if(err) throw err;
        //     console.log(items);   
        // });
        //return db.close();
    });
});