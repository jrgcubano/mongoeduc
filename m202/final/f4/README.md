# Final: Question 4: Fixing a Bad Shard Key

Suppose you have a sharded collection final_exam.m202 in a cluster with 3 shards. To set up the problem, first initialize a cluster with 3 single-server shards (not replica sets) in the mongo shell using ShardingTest:

$ mongo --nodb
> config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" }, d2 : { smallfiles : "", noprealloc : "", nopreallocj : ""}};
> cluster = new ShardingTest( { shards : config } );
Then click "Initialize" in MongoProc, which will verify that you have 3 shards and then insert test data into final_exam.m202.

Unfortunately, even though your shard key {otherID: 1} has high cardinality, the data is not being distributed well among the shards. You have decided that a hashed shard key based on the _id field would be a better choice, and want to reconfigure the collection to use this new shard key. Once you have the cluster using the new shard key for final_exam.m202, test in MongoProc and turn in when correct.

# Solution

- Start the sharded cluster test
mongo --nodb
config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" }, d2 : { smallfiles : "", noprealloc : "", nopreallocj : ""}};
cluster = new ShardingTest( { shards : config } );

- MongoProc initialization steps (automatic from mongodb team):
	- Connected to localhost:30999
	- Initializing sharded collection
	- Dropped database final_exam
	- Successfully enabled sharding on database final_exam
	- Successfully enabled sharding on collection final_exam.m202
	- creating and inserting test data
	- finished loading data
	- successfully initialized

In case someone want to use this example without MongoProc. You can restore the dump (dump-copy-by-me-to-test.tar.gz) like the solution, and follow the mongoProc initialization steps to have the wrong shard key situation. When you restore the dump, you need to create the wrong shard key over otherID on m202 collection. Then you can continue with the solution (hashed shard key).

- Dump all data from mongos
mongodump --host localhost --port 30999
- Drop the sharded collection 
mongo --port 30999
use final_exam
db.m202.drop() (wait the shard sync)
- Create the new hashed shard key
sh.shardCollection( "final_exam.m202", { _id: "hashed" } )
- Restore the dumped data (in this case we restore only the "m202" collection data from "final_exam" database)
mongorestore --host localhost --port 30999 --collection m202 --db final_exam dump/final_exam/m202.bson

