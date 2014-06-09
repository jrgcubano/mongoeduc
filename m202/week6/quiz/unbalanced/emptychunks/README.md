# Quiz: Empty chunks

Spin up a sharded cluster using ShardingTest and create a number of empty chunks. Then merge a chunk range or two using the mergeChunks command. See the docs for more information on mergeChunks. You only need one shard for this exercise.

You can use a pre-splitting algorithm of some kind to create the empty chunks. For example, to create chunks for documents in the myapp.users collection using the email field as the shard key, you can run the following operation in the mongo shell.

```javascript
for ( var x=97; x<97+26; x++ ) {
    for( var y=97; y<97+26; y+=6 ) {
        var prefix = String.fromCharCode(x) + String.fromCharCode(y);
        db.runCommand( { split : "myapp.users", middle : { email : prefix } } );
    }
}
```

# Solution
First thing you'll need to do is spin up a cluster for this test. You can pick your number of shards & replica set configuration, but here's a simple example with 3-node replica sets:

> cluster = new ShardingTest( { shards: 1, rs: { nodes: [ { } ] } } );
Once that has spun up, connect to the mongos:

$ mongo --port 30999
then enable sharding on your database and shard your collection:

mongos> sh.enableSharding("myapp")
{ "ok" : 1 }
mongos> sh.shardCollection( "myapp.users" , { "email" : 1 } )
{ "collectionsharded" : "myapp.users", "ok" : 1 }
mongos> 
Now, we can look at our chunks and see that initially we have only one:

mongos> use config
switched to db config
mongos> db.chunks.find()
{ "_id" : "myapp.users-email_MinKey", "lastmod" : Timestamp(1, 0), "lastmodEpoch" : ObjectId("538e27be31972172d9b3ec61"), "ns" : "myapp.users", "min" : { "email" : { "$minKey" : 1 } }, "max" : { "email" : { "$maxKey" : 1 } }, "shard" : "test-rs0" }
mongos>
Great! So let's now break that apart with the script in the problem statement:

mongos> use admin
switched to db admin
mongos> for ( var x=97; x<97+26; x++ ) {
...     for( var y=97; y<97+26; y+=6 ) {
...         var prefix = String.fromCharCode(x) + String.fromCharCode(y);
...         db.runCommand( { split : "myapp.users", middle : { email : prefix } } );
...     }
... }
{ "ok" : 1 }
mongos>
And now we can see that we've got lots of chunks:

mongos> use config
switched to db config
mongos> db.chunks.find().count()
131
So now to merge a few of them. First, we'll want to verify that they're empty. Of course, we know that these are empty (since we haven't put any data in them), but in production, things might not be so obvious. I'll set some variables to make querying easy, then verify the size of data in it:

mongos> first_doc = db.chunks.find().next()
{
	"_id" : "myapp.users-email_MinKey",
	"lastmod" : Timestamp(2, 0),
	"lastmodEpoch" : ObjectId("538e27be31972172d9b3ec61"),
	"ns" : "myapp.users",
	"min" : {
		"email" : { "$minKey" : 1 }
	},
	"max" : {
		"email" : "aa"
	},
	"shard" : "test-rs1"
}
mongos> min = first_doc.min
{ "email" : { "$minKey" : 1 } }
mongos> max = first_doc.max
{ "email" : "aa" }
mongos> keyPattern = { email : 1 }
{ "email" : 1 }
mongos> ns = first_doc.ns
myapp.users
mongos> db.runCommand({dataSize: ns, keyPattern: keyPattern, min: min, max: max } )
{ "size" : 0, "numObjects" : 0, "millis" : 0, "ok" : 1 }
So, that last line tells us that there are 0 documents in that first chunk. We could do this with any number of chunks, and of course the answer will be the same.

OK, let's merge the first and second docs, first finding the shard key maximum on the second doc:

mongos> second_doc = db.chunks.find().skip(1).next()
{
	"_id" : "myapp.users-email_\"aa\"",
	"lastmod" : Timestamp(3, 0),
	"lastmodEpoch" : ObjectId("538e27be31972172d9b3ec61"),
	"ns" : "myapp.users",
	"min" : {
		"email" : "aa"
	},
	"max" : {
		"email" : "ag"
	},
	"shard" : "test-rs0"
}
mongos> max2 = second_doc.max
{ "email" : "ag" }
mongos> use admin
switched to db admin
mongos> db.runCommand( { mergeChunks : ns , bounds : [ min , max2 ] } )
{ "ok" : 1 }
So there we've done it! Let's look at our chunk data:

mongos> use config
mongos> db.chunks.count()
130
mongos> db.chunks.find().limit(2)
{ "_id" : "myapp.users-email_MinKey", "ns" : "myapp.users", "min" : { "email" : { "$minKey" : 1 } }, "max" : { "email" : "ag" }, "version" : Timestamp(1, 261), "versionEpoch" : ObjectId("538e2cc240ba884cdd64c109"), "lastmod" : Timestamp(1, 261), "lastmodEpoch" : ObjectId("538e2cc240ba884cdd64c109"), "shard" : "test-rs0" }
{ "_id" : "myapp.users-email_\"ag\"", "lastmod" : Timestamp(1, 5), "lastmodEpoch" : ObjectId("538e2cc240ba884cdd64c109"), "ns" : "myapp.users", "min" : { "email" : "ag" }, "max" : { "email" : "am" }, "shard" : "test-rs0" }
So we've eliminated a chunk (count went from 131 to 130), and we can see that the first chunk's range goes all the way from $minKey to 'ag'.


