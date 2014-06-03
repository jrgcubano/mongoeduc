# Week5 Charded Cluster Management

Config Servers
================
- Standalone and identical mongod servers.
- The are not all created equal (config string passed to mongos). The first config server in the list is important. - If you lose 1 or 2 config servers, the cluster continues to function. In this case you can't modify any metadata or chunksize, etc in the sharded enviroment.
- Useful Commands on mongos: sh.status(), db.chunks() on config db, sh.enableSharding("dbname")
- It's important to remember that all operations over configs, need to be done through the mongos and not directly.

Periodic Maintenance on Sharded Clusters
========================================
- The replica set backup or rolling process is the same in a sharded cluster and in a non-sharded enviroment.
- A backup on config servers can be done using a mongodump because they are to small.
- If you are going to use a config server for backup, use the second one or another but not the first one. Never shutdown the firstone to process the backup.

Upgrades on Sharded Clusters
============================
- General order for upgrades (recommendation):
	- Secondaries of your shards first
	- Upgrade your Primaries (using step down)
	- Config servers: Take one out, upgrade it, bring it back in, repeat the proces with the rest, etc
	- Mongos processes

Services a mongos performs
==========================
- Primary Duties:
	- Router for requests/operations
	- Present clients with a single view o the sharded db
- HouseKeeping Duties:
	- Split chunks
	- Coordinates chunk migrations
- Merge data from queries results obtained from the different shards (example a find(..).sort(..))
- Mongos processes do connection pooling
- Flush cashing on mongos. Use this command ( db.runCommand({flushRouterConfig : 1}) ) if you suspect some sort of a stale cashing issue. 

Chunk Splitting
===============
- Chunks are not physical data:
	- logical grouping/partitioning
	- described by the metadata
	- when you split a chunk, no change to the actual data are performed, you are changing only the metadata that represents the real data.

- Chunk splitting algorithm (auto method)
	- heuristic algorithm: mongos tracks writes to chunks. 
		- ~20 % of the max chunk size (12-13 mg)
		- use splitVector on shard primary to ask for possible split points using a possible key.
		- primary returns a list of split points
		- update the meta data to reflect the split
		- no data has moved, no data has changed
- Manual chunk splitting:
	- sh.splitFind("dbname.collectioname", {key : ....}), sh.splitAt()
	- To turn autosplit off: --noAutoSplit
- Jumbo chunks
	- A jumbo chunk is one that exceeds the maximum chunk size.
	- Appears for example when you pick a very bad shard key
	- Cannot be moved

Chunk Splitting (manual example)
================================

- Pre-splitting overview:
	- How to Programatically Pre-Split a GUID Based Shard Key with MongoDB (stackoverflow.com/questions/19672302/how-to-programatically-pre-split-a-guid-based-shard-key-with-mongodb)
	- Caveat: Do this before you insert data
	- When would you want to do this?:
		- You know what your shard key is going to be. A know domain of data
		- You've already multiple shards up and running.
		- You're about to do a bulk initial data load. You're going to load in a lot of data onto your database.
		- Avoid bottlenecks
		- you have a large amount of data in your cluster and very few chunks, as is the case after deploying a cluster using existing data.
		- you expect to add a large amount of data that would initially reside in a single chunk or shard.
		- example: You plan to insert a large amount of data with shard key values between 300 and 400, but all values of your shard keys are between 250 and 500 are in a single chunk.


- Described the data:
	- 10k avg doc size
	- 6 million of them
	- guid : 32 character hex string
	- approx 60gb of data
	- max chunk size: 64mb ~ we are using 32 mb
	- 1920 chunks
	- 16 x 16 x 16 = 4096/2 = 2048 spliting factor

