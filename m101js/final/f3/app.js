var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/enron', function(err, db) {
    if(err) throw err;

    db.collection('messages', function(err, collection) {
        if(err) throw err;  

        collection.update( 
            {'headers.Message-ID':'<8147308.1075851042335.JavaMail.evans@thyme>'},
            { $push : {'headers.To': 'mrpotatohead@mongodb.com'}},    
        function(err, result){
            if(err) throw err;
            console.log(result);   
            return db.close();
        });
        
    });
});