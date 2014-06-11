# Homework: 6.2 Traffic Imbalance in a Sharded Environment

In this problem, you have a cluster with 2 shards, each with a similar volume of data, but all the application traffic is going to one shard. You must diagnose the query pattern that is causing this problem and figure out how to balance out the traffic.

To set up the scenario, run the following commands to set up your cluster. The config document passed to ShardingTest will eliminate the disk space issues some students have seen when using ShardingTest.

$ mongo --nodb
> config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" } };
> cluster = new ShardingTest( { shards: config } );
Once the cluster is up, click "Initialize" in MongoProc one time to finish setting up the cluster's data and configuration. If you are running MongoProc on a machine other than the one running the mongos, then you must change the host of 'mongod1' in the settings. The host should be the hostname or IP of the machine on which the mongos is running. MongoProc will use port 30999 to connect to the mongos for this problem.

Once the cluster is initialized, click the "Initialize" button in MongoProc again to simulate application traffic to the cluster for 1 minute. You may click "Initialize" as many times as you like to simulate more traffic for 1 minute at a time. If you need to begin the problem again and want MongoProc to reinitialize the dataset, drop the week6 database from the cluster and click "Initialize" in MongoProc.

Use diagnostic tools (e.g., mongostat and the database profiler) to determine why all application traffic is being routed to one shard. Once you believe you have fixed the problem and traffic is balanced evenly between the two shards, test using MongoProc and then turn in if the test completes successfully.

Note: Dwight discusses the profiler in M102 (https://www.youtube.com/watch?v=MzLmI8FNB94&feature=youtu.be).

# Solution
- mongo --nodb in a shell
- config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" } };
- cluster = new ShardingTest( { shards: config } );
- mongo --port 30999 to enter mongos
- sh.status() to see the status of sharding
- initialize the data using MongoProc (steps performed by the proc from mongo team):
	- Database week6 does not exist
	- Initializing sharded collection
	- Dropped database week6
	- Successfully enabled sharding on database week6
	- Successfully enabled sharding on collection week6.m202
	- Pre-splitting chunks
	- Creating test data
	- Inserting test data
	- Successfully initialized
	- To simulate traffic, re-run the initialization script.
- Activate profiling in each shard and use 
	- db.system.profile.find().sort({"$natural":-1}).limit(5).pretty() to see the queries when you send traffic
- Problem: 
	- Update query over "week6.m202" with this dates ranges: _id" : { "$gte" : ISODate("2014-07-13T00:00:00Z"), "$lt" : ISODate("2014-07-19T00:00:00Z")}
	- All the chunks (6 of them) on that range are in shard0000.
- Solution:
	- stop balancer and move 16, 17 and 18 of july chunks to shard0001
	- now we have three chunks on each shard satisfying the update query.
	- start the balancer
- mongostat --port 30999 --discover to see how now the updates are balanced between the two shards.
	
 


