# Homework: 6.1: Using shard tags to manage data

In this problem we will emulate a data management strategy in which we periodically move data from short-term storage (STS) to long-term storage (LTS). We have implemented this strategy using tag-based sharding.

Start by spinning up a sharded cluster as follows:

```javascript
$ mongo --nodb
> config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" }, d2 : { smallfiles : "", noprealloc : "", nopreallocj : ""}};
> cluster = new ShardingTest( { shards : config } );
```

This will create 3 standalone shards on ports 30000, 30001, and 30002, as well as a mongos on port 30999. The config portion of the above will eliminate the disk space issues some students have seen when using ShardingTest.

Next, initialize the data in this cluster using MongoProc. You can choose the host you're pointing to, but MongoProc will be looking for the mongos at port 30999.

Following initialization, your system will contain the collection testDB.testColl. Once initial balancing completes, all documents in this collection with a createdDate field value that falls any time in the year 2013 are in LTS and all documents created in 2014 are in STS. There are two shards used for LTS and one shard for STS.

Your assignment is to move all data for the month of January 2014 into LTS as part of periodic maintenance. For this problem we are pretty sure you can "solve" it in a couple of ways that are not ideal. In an ideal solution you will make the balancer do the work for you. Please note that the balancer must be running when you turn in your solution.

# Solution
- mongo --nodb in a shell
- On the same shell -> config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" }, d2 : { smallfiles : "", noprealloc : "", nopreallocj : ""}};
- cluster = new ShardingTest( { shards : config } );
- mongo --port 30999 to enter mongos
- sh.status() to see the status of sharding
- initialize the data using MongoProc (steps performed by the proc from mongo team):
	- Connected to localhost:30999 (mongos)
	- Successfully enabled sharding on database testDB
	- Successfully sharded collection testDB.testColl
	- Stopped the balancer.
	- Successfully split int one-day chunks
	- Successfully inserted one document for each hour.
	- Successfully tagged testDB.testColl createdDate field.
	- Started balancer
- sh.status():
	- chunks:
		- shard0002 184
		- shard0000 182
		- shard0001 121
- sh.stopBalancer()
- Add new ranges
	- sh.addTagRange('testDB.testColl', {createdDate : ISODate("2013-01-01")}, createdDate : ISODate("2014-02-01")}, "LTS")
	- sh.addTagRange('testDB.testColl', {createdDate : ISODate("2014-02-01")}, createdDate : ISODate("2014-05-01")}, "STS")
- sh.status() to see the new ranges:
	- tag: LTS  { "createdDate" : ISODate("2013-01-01T00:00:00Z") } -->> { "createdDate" : ISODate("2014-02-01T00:00:00Z") }
	- tag: STS  { "createdDate" : ISODate("2014-01-01T00:00:00Z") } -->> { "createdDate" : ISODate("2014-05-01T00:00:00Z") }
	- tag: STS  { "createdDate" : ISODate("2014-02-01T00:00:00Z") } -->> { "createdDate" : ISODate("2014-05-01T00:00:00Z") }
- sh.startBalancer()
- Delete tag entry, so the balancer start the migration to LTS on the respective shards
	- db.tags.remove({_id : { ns : "testDB.testColl", min : { createdDate : ISODate("2014-01-01")} }, tag: "STS" })
- sh.status when the migration ends:
	- Chunks:
		- shard0002 199
		- shard0000 198
		- shard0001 90



