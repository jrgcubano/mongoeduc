# mongodb-scripts (https://github.com/comerford/mongodb-scripts)
These are just some scripts and recipes I find useful when administering MongoDB

They are not intended to be fully fledged tools, and will occasionally need some tweaking to run in particular environments, but I have found them quite useful in the past.

# Explanation of AllChunkInfo.js based on a question:
For the purposes of this answer I have created a 2 shard cluster with ~1 million documents as per these instructions (see two_shards_1m_docs.js). Next up I used this function to examine those documents:

```javascript
AllChunkInfo = function(ns, est){
    var chunks = db.getSiblingDB("config").chunks.find({"ns" : ns}).sort({min:1}); //this will return all chunks for the ns ordered by min
    //some counters for overall stats at the end
    var totalChunks = 0;
    var totalSize = 0;
    var totalEmpty = 0;
    print("ChunkID,Shard,ChunkSize,ObjectsInChunk"); // header row
    // iterate over all the chunks, print out info for each 
    chunks.forEach( 
        function printChunkInfo(chunk) { 

        var db1 = db.getSiblingDB(chunk.ns.split(".")[0]); // get the database we will be running the command against later
        var key = db.getSiblingDB("config").collections.findOne({_id:chunk.ns}).key; // will need this for the dataSize call
        // dataSize returns the info we need on the data, but using the estimate option to use counts is less intensive
        var dataSizeResult = db1.runCommand({datasize:chunk.ns, keyPattern:key, min:chunk.min, max:chunk.max, estimate:est});
        // printjson(dataSizeResult); // uncomment to see how long it takes to run and status           
        print(chunk._id+","+chunk.shard+","+dataSizeResult.size+","+dataSizeResult.numObjects); 
        totalSize += dataSizeResult.size;
        totalChunks++;
        if (dataSizeResult.size == 0) { totalEmpty++ }; //count empty chunks for summary
        }
    )
    print("***********Summary Chunk Information***********");
    print("Total Chunks: "+totalChunks);
    print("Average Chunk Size (bytes): "+(totalSize/totalChunks));
    print("Empty Chunks: "+totalEmpty);
    print("Average Chunk Size (non-empty): "+(totalSize/(totalChunks-totalEmpty)));
}  
```
It's pretty basic at the moment, but it does the job. I have also added it on github and may expand it further there. For now though, it will do what is needed. On the test data set described at the start, the output looks like this (some data removed for brevity):

```javascript
mongos> AllChunkInfo("chunkTest.foo", true);
ChunkID,Shard,ChunkSize,ObjectsInChunk
chunkTest.foo-_id_MinKey,shard0000,0,0
chunkTest.foo-_id_0.0,shard0000,599592,10707
chunkTest.foo-_id_10707.0,shard0000,1147832,20497
chunkTest.foo-_id_31204.0,shard0000,771568,13778
chunkTest.foo-_id_44982.0,shard0000,771624,13779
// omitted some data for brevity
chunkTest.foo-_id_940816.0,shard0000,1134224,20254
chunkTest.foo-_id_961070.0,shard0000,1145032,20447
chunkTest.foo-_id_981517.0,shard0000,1035104,18484
***********Summary Chunk Information***********
Total Chunks: 41
Average Chunk Size (bytes): 1365855.024390244
Empty Chunks: 1
Average Chunk Size (non-empty): 1400001.4
```
To explain the arguments passed to the function:

The first argument is the namespace to examine (a string), and the second (a boolean) is whether or not to use the estimate option or not. For any production environment it is recommended to use estimate:true - if it is not used, the all the data will need to be examined, and that means pulling it into memory, which will be expensive.

While the estimate:true version is not free (it uses counts and average object sizes), it is at least reasonable to run even on a large data set. The estimate version can also be a little off if object size is skewed on some shards and hence the average size is not representative (this is generally pretty rare).
