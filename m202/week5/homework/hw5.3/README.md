# Homework: 5.3: Grappling with stale metadata on a mongos

In this problem, you will be grappling with stale metadata on your mongos, and on your replica set.

Suppose through some series of events you end up with a mongos that has stale metadata. You can see this because your document with _id: 90001 should have a different value for the "string" field than the "testStringForPadding0000000000000000000000000000000000000000" that you're currently seeing when you query it.

First, make sure that you have set open read/write permissions for the /data/db directory. We will be using this directory for this problem. Also please make sure you are able to use ports 29000 (for your config server), 30999 (for your mongos), 31100-31102 (for your first replica set), and 31200-31202 (for your second replica set). You may point MongoProc to the appropriate host, but it will assume that these ports are the ones we are using, regardless of what you have specified in the MongoProc settings.

Next, on the host that you'll be using, open your mongo shell without connecting to a mongod instance:

$ mongo --nodb
Now, we will spin up a sharded cluster with 2 shards, each of which has 3 members (a primary, a secondary, and an arbiter) plus one config server. We will do this using ShardingTest as follows.

> cluster = new ShardingTest({shards: 2, chunksize: 1, rs : {nodes : [{}, {}, {arbiter: true}]} });
Give that a minute to spin up and you should see all of your mongod's plus a mongos at port 30999. At this point, you can initialize MongoProc and begin your homework.

Start by initializing with MongoProc. Once you have initialized, your "testDB.testColl" collection will be populated (it will be dropped at the beginning of the initialization if present), and it will be split into chunks, and those chunks will be distributed across each of your shards.

In addition, your balancer will be turned off, and some metadata will have changed (which your mongos is not aware of).

Without turning on your balancer, adding/removing documents, or otherwise modifying your data (or metadata), please correct the stale data problem with your mongos. You should be able to do everything you need to do on just your mongos.

In order to see the problem, look for the document with _id: 90001. Each shard will have its own copy, and the mongos will look for it on the wrong shard. When you get a new value for the "string" field (one that doesn't end with lots of 0's), you've completed the problem.

# Answer
- mongo --nodb in a shell
- cluster = new ShardingTest({shards: 2, chunksize: 1, rs : {nodes : [{}, {}, {arbiter: true}]} })
- init collection with MongoProc initialize
- The problem here is an outdated metadata on mongos. You need to sync it with real data from config database.
	- db.adminCommand("flushRouterConfig" to forces an update to the cluster metadata cached by a mongos.
- change port on MongoProc to 30999
- test 
- tune in
