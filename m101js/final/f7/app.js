var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/photosharing', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('images').find(); 
    var imagesToDelete = [];

    var i = 0;
    cursor.each(function(err, doc){
        if(err) throw err;
        if(doc == null){
            return db.close();
        }

        db.collection('albums', function(err, albums_col){
            if(err) throw err;

            var image_id = doc._id;
            albums_col.find({'images' : image_id})
                      .count(function(err, total){
                if(err) throw err;
                if(total == 0){
                    console.log('ForDelete: ' + image_id); 
                    // db.collection('images', function(err, images_col){
                    //     if(err) throw err;

                        // images_col.remove({'_id': image_id}, function(err, result){
                        //     console.log('Try delete: ' + result); 
                        //     if(err) throw err;
                        //     console.log('Deleted: ' + result); 
                        // });
                    // });
                      imagesToDelete.push(image_id);
                }
            });
        });
    });
});