// This is a very simple function, which takes three arguments:
// ns: a string representing the sharded namespace to be examined        
// id: the chunk ID for the chunk you want the information on
// est: a boolean to determine whether or not to use the estimate option (recommended generally)

// It is called from the mongos like so:

// ChunkInfo("database.collection", database.collection-_id_"value", true);
// Currently the output is CSV, will add options for other output later

ChunkInfo = function(ns, id, est){
    var configDB = db.getSiblingDB("config");
    var db1 = db.getSiblingDB(ns.split(".")[0]);
    var key = configDB.collections.findOne({_id:ns}).key;
    var chunk = configDB.chunks.find({"_id" : id }).limit(1).next();
    var dataSizeResult = db1.runCommand({datasize:chunk.ns, keyPattern:key, min:chunk.min, max:chunk.max, estimate:est});
    print("***********Chunk Information***********");
    printjson(chunk);
    print("Chunk Size: "+dataSizeResult.size)
    print("Objects in chunk: "+dataSizeResult.numObjects)
}