# Final: Question 2: Config Servers

In this assignment, you will fix a problem that sometimes arises with config servers in a sharded cluster.

Start by running:

$ mongo --nodb
> cluster = new ShardingTest( { shards: 1 , rs : { nodes : [ { } ] }, config : 3 } )
Next, click the "Initialize" button in MongoProc. This will create the problem you will need to fix.

You can see the issue if you try to split a chunk in the 'testDB.testColl' collection with:

db.adminCommand( { split : "testDB.testColl", middle : { _id : 7 } } )
This will fail. Your job is to track down the problem and solve it. When you think you've got it, test it with MongoProc and submit when finished.

Hint: You will almost certainly need to spin up your own config server separately from the ShardingTest. Make sure you use all of the same parameters used by ShardingTest when starting config servers. You can see these parameters by typing

ps ax | grep mongo
in a Linux shell.

Solution
--------
- Start the shard cluster test
mongo --nodb (on a shell)
cluster = new ShardingTest( { shards: 1 , rs : { nodes : [ { } ] }, config : 3 } ) 
Seed the problem with MongoProc (from mongodb team)

- Check if the three config servers are in sync:
mongo --port 29000 (the same for 29001, 29002)
use config
db.runCommand("dbhash")

- Compare the config server collections hashes to find the problem
We find the sync problem in the chunks collections	
	- port 29000 -> chunks : "7f133a5a75a81f6eed9dc420fc05247e
	- port 29001 -> chunks : "7f133a5a75a81f6eed9dc420fc05247e
	- port 29002 -> chunks : "4dd07abab72c591c6f85d0e93668aaab" (sync problem here)
- Rsync  (In a production enviroment, we backup everything):
	- stop config servers on port 29001 and 20002 
	- remove /data/db/test-config1
	- rsync -az /data/db/test-config1/ /data/db/test-config2/
	- Start config servers and wait for unlocks: 
		- mongod --port 29001 --dbpath /data/db/test-config1 --configsvr --setParameter enableTestCommands=1
		- mongod --port 29002 --dbpath /data/db/test-config2 --configsvr --setParameter enableTestCommands=1
