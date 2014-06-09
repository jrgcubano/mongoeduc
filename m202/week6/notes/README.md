# Week6 Sharded Cluster Management

Balancer
========
- Recommended commands for administer balancer settings:
	- sh.stopBalancer(), sh.startBalancer() for balancer
	- sh.disableBalancing("shardTest.foo"), sh.enableBalancing("shardTest.foo") for collections
- Balancer in a Schedule window:
	- db.settings.update({_id: "balancer"}, { $set : { activeWindow : { start : "23:00", stop : "6:00"} } }, true)
- Balancer kick in a chunk:
	- How does it pick chunks to migrate?: the balancer start to kick and move things around: 
		- total chunks < 20 : Difference between chunks 2
		- 20 < total chunks < 80 : Diff 4
		- total chunks >= 80 : Diff 8
- Balance pick chunks:
	- Moves chunks form the shard with highest chunk count for that collection.. The max chunk value
	- On that shard, it would move the chunk with lowest range. The min chunk value

Anatomy of a Migration
======================
- Misunderstood (blame):
	- ligthweight (64 mb)
	- one at a time (cluster-wide)
- Touches all components in sharded cluster
- db.changelog.find().sort({time : -1}).pretty() to see balancer migrations between clusters. Focus on moveChunk.To, moveChunck.From, moveChunk.start and moveChunk.commit.

Anatomy of a Migration (Deep Dive)
==================================
Steps with a From and a To shards to migrate chunks 
- 1. mongos -> balance round -> lock
- 2. identify imbalance, pick a chunk to migrate
- 3. Send command to F(from shard (step 1 - F)
- 4. F performs sanity checks (step2 - F)
- 5. F sends command to T(0) shard (step3 - F)
- 6. Tranfers starts (step4 - F, Step1-3 - T)
- 7. Catchup on subsequent operations (step4 - F, step4 - T)
- 8. Catchup finished, transfer complete(steady) (step5 - T)
- 9. Critical section (about to commit changes to config server) (step5 - F)
- 10. Clean up (steap6 - F)
- 11. Subsequent requrest to F fro chunk get stale config exception, trigger mongos refresh

System-level migrations options 
===============================
In the reference moveChunk
- waitForDelete (false = default)
- secondaryThrottle (w:2 write concern)

Tag-based sharding overview
============================
- Tags are used when we want to "pin" collections, or ranges, to specific shards:
	- Example:  5 shards (s1 s2 in us, s3 in apac, s4 and s5 in emea). A list of users that have a region component. When we shard we use 
	that component in the shard key. The users go to the particular local shard in their region for reads. You can present a single interface to everybody, so that the mongos's that are sitting in front of all of these sharded clusters, it's just one big database. You use routing to the correct place.

Tab-based sharding (example)
============================
- Choose an appropriate shard key: 
	- Collections look like: { _id:.., user_id: ..., other: ...  region: "EMEA"...}, { _id:.., user_id: ..., other: ...  region: "US"...}
	- You can use a componend Shard key: {region: 1, used_id : other: 1 } to splits the chunks.
- Two steps
	- Add tags with the regions to the shards: 
		- sh.addShardTag("shard0001", "USEAST"), 
		- sh.addShardTag("Shard0002", "EMEA")
		- sh.addShardTag("shard0003", "APAC")
		- sh.addShardTag("shard0004", "USWEST")
		- db.shards.find().pretty() to see the configuration
	- We need to tag the various ranges. In the example this will be in lexicographical order. So iterating you can split in different chunks and have something like this:

	```javascript
	for region in ["APAC", "EMEA", "USEAST", "USWEST"] {
		for (x = 0; x < 16; x++) {
			for (y = 0; y < 16; y++) {
				prefix = 'region' + x + y + padding
				db.adminCommand(split : ..., middle : prefix)
			}
		}
	}
	```

	This will give us: 
	- 1024 chunks across four regions
	- 256 chunks each region
	
	Doing some similar iteration we can add the tags range:
	
	```javascript
	
	Iterate through all regions
	......
		sh.addTagRange("regiondata.users", 
					{ $minKey }, { "APAC......"), "APAC"} 
					...
					APAC (256))
					... 
					EMEA (256)
					....
	...
	```

* Quiz for this section on tags folder

Tag-based sharding caveats
==========================
- First caveat (example):
	- zipcode ranges with tagged shards:
		- "NY" (100 - 200)
		- "NS" (200 - 300)
	- We have a chunk described as Minkey = 150 and MaxKey = 220. 
	- How does a balancer make a decision to where put this chunk? In wich tagged shard it will be?. The answer is that it will pick "NY" shard. 
	The reason is it looks at the lower boundary here (150) and checks to see which one of the max values in the range is closest to (200). The upper bound of the shard range is the key for deciding which one of these competing tags will actually win for this kind of thing. 
- Second caveat: Balancer respects tags for future balancing (example)
	- 3 shards (s1 - 32 chunks, s2 - 31 chunks, s3 - 32 chunks). We Pin tags in a collection between s1 and s2. 
	- The problem here is nothing going to happen because the tags repects... So in this case you need to move chunks manually. And as a recommendation remember that you can disable the balancer for this actions.

Hash-based sharding overview
============================
- Similar considerations to pre-splitting:
	- you need high cardinality on shard key values
	- Floating point numbers can be problematic
- How it works. You pick a field, on that field you create a index with a computed hash:
	- ensudeIndex command { "_id" : "hashed"}
- That give you the possibility to use this hashed index as shard key:
	- shard collection command: pass in the "_id" for example...
- Only supports single values.

Hash-based sharding (example)
=============================
- Steps on mongos:
	- Create shards, etc
	- sh.stopBalancer().....
	- sh.enableSharding("hashTest")
	- use hashTest
	- db.bar.ensureIndex("_id" : "hashed") on the field to use as a shard key.
	- db.bar.getIndexes() to see
	- sh.shardCollection("hashTest.bar", {"_id": "hashed"}) to shard the collection on the hashed key
	- sh.status()
	- Initially by default mongo puts two chunks for the collection in each shard. If you want to change that behavior you can use:
		- db.adminCommand({shardCollection: "hashTest.bar", key : { "_id : 1"}, numInitialChunks : 2048})
	- You can use different calculations like spliting to creates the chunks. Example: 60gb, 4 shards, 10 k, 6m : 1920 split 4 ways
 rather than 2.

Hash-based sharding pros and cons
=================================
- Benefits?
	- Very good for scaling writes
- Drawbacks?
	- 1 document -> scatter gather: non-specific queries -> all shards. Only as fast as "slowest shard"
	- Single field only
	- not supported will using tag based sharding

Unbalanced chunks overview
==========================
- Overview:
	- Number of chunks -> only thing the balancer cares about:
		- does not consider size (amount of data)
		- does not consider number of documents
		- crude balancing meeasurement
	- The balancer splits automatic when we reached the 250000 documents 
Scenarios where imbalance occurs. Categories:
	- Lots of empty chunks
	- Some number of large chunks

* Quiz for this section on unbalanced folder

Unbalanced chunks scenarios (Empty chunks)
==========================================
When can occur this scenario:
- Pre-splitting mistake 
- Time based shard key
	- periodically deleting old data

- Example: you have 1 shard with {_id : 1} and 500 chunks, and then you add a second shard.. The balancer pick the chunks to move based on the lowest range. When the balancer finished, you gonna have a shard with the 250 newest and other with 250 oldest chunks. Then you come along and says that you don't need anything old than six months (in this example 6 months ~ 250 chunks). So in resume you are goint to delete all the data in shard 2 (250 oldest ~ 6 months). You ends with a shard2 with 0 data.

- What to do with empty chunks?
	- stop the balancer
	- manually move the chunks
	- from 2.6 use mergeChunk. Only merge chunks that:
		- 1. are on the same shard
		- 2. contiguous ranges
		- 3. one, or both, must be empty

Unbalanced chunks scenarios (Data Inbalance)
============================================
When can occur this scenario?
- Poor shard key
- Pre-splitting error
- Auto-splits require traffic

- What to do with unbalanced scenario:
	- wait for auto splits / balancing
	- manual splits -> wait for balancer
	- manual splits and manual move

* AllChunkInfo its a public script to get information to figure out where your imbalance is, what chunks are imbalanced 
and how imbalanced they are. 

Orphaned chunks (overview)
===========================
- Temporary orphaned chunks
In a migration scenario, when you are moving a chunk from one shard to other
.....
- Permanent orphaned chunks

Orphaned Chunks (How to deal with orphaned chunks)
==================================================
- pre 2.6 orphanage.js in scripts
- 2.6 + cleanupOrphaned command

Removing a shard (Draining a shard)
===================================
- Should not be done ligthly
- Going to be slow
- Steps:
	- run the removeShard command (db.adminCommand({removeShard : "test-res1"}).
	- wait for all chunks to be migrated off
	- move any databases that have that shard as their primary (movePrimary):
		- when we talk about primary database...
		- use config
		- db.databases.find() -> .. { "_id" : "admin, "partitioned": false, "primary" : config }
								 .. { "_id" : "shardTest, "partitioned": false, "primary" : "test-rs0" } (you see the shard to drain....)
		- so, you will need to move all databases in the target shard into other shard when we drained the shard.
	- run the removeShard command again
	- db.shards.find().pretty() -> to see the state of draining operation....
* the balancer must be running when you remove the shard 
