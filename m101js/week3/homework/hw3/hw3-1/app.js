var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db){
  if(err) throw err;
  var query = {};

  db.collection('students').find(query).toArray(function(err, docs) {
    if(err) throw err;

    var min;
    var doc;
    var value;
    for (var i = 0; i < docs.length; i++){
        doc = docs[i];
        min = -1;
        for(var j = 0; j < doc.scores.length; j++){
           value = doc.scores[j];
           if(value.type === "homework"){
             if(min === -1 || value.score < doc.scores[min].score ){
               min = j;
             }
           }
        }
        console.log("Ant length :" + doc.scores.length + " min : " + min);
        // important: Array.splice need the number of elements to delete...  splice(index, )
        doc.scores.splice(min, 1);
        console.log("Pos length :" + doc.scores.length);
        db.collection('students').save(doc, function(err, saved) {
          if(err) throw err;
          console.log("Doc saved: " + saved);

        });
    }
    //console.dir("Result" + docs);
    console.dir("End");
    return db.close();
  });

});

