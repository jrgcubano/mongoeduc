# Homework: 4.3: Triggering Rollback

In this problem, you will be causing a rollback scenario. Set up a replica set with one primary, one secondary, and an arbiter. Write some data to the primary in such a way that it does not replicate on the secondary (perhaps by taking down the secondary) then remove the primary from the replica set. Let the secondary come back up and become primary, write to it, and then bring up the original primary (it will now be a secondary).

Once you've triggered the rollback scenario, please submit your work using MongoProc. You do not need to reload the data lost during rollback. For your solution to be graded correct, you must have one secondary in the replica set on which rollback has occurred. Please launch your mongods using absolute pathnames as values for the --dbpath parameter or MongoProc will not be able to determine whether you have complete the assignment correctly.

Adam wrote a tutorial blog post (http://comerford.cc/wordpress/2012/05/28/simulating-rollback-on-mongodb/) on simulating rollback. It might be a little outdated, but provides a detailed discussion of this topic and is worth the read.

# Answer
- Start mongod
mkdir -p /data/db/rs202/rs1 /data/db/rs202/rs2 /data/db/rs202/rs3
sudo ./init_instances.sh

- Config replicaSet:
	. mongo --port 27017 < init_config.js
	. On the mongo shell add an arbiter: rs.addArb("localhost:27019")
- Access the db (testDB), insert some document, and check that the replicaSet is working
use testDB
// test
db.testDB.testColl.insert({"a":"a"})

- Process to rollback
	. Stop secondary mongod on port 27018:
		- ps -A | grep mongod 
		- sudo kill pid (on port 27018)
	. Insert some data in the primary on port 27017
	. Stop primary 
		- ps -A | grep mongod
		- sudo kill pid (on port 27017)
	. Start the secondary on port 27018 and check that is promoted to primary with rs.status()
		- mongod --replSet m202 --logpath "rs2.log" --dbpath /data/db/rs202/rs2 --port 27018 --smallfiles --oplogSize 100 --fork
	. Insert some documents on the new primary on port 27018
	. Start the old primary on port 27017 (you can see the automatic rollback on /data/db/rs202/rs1/rollback/)
		- you can see the operations involved on the rollback with "bsondump xxxx.bson"
	. Use MongoProc to check the results. Ensure that mongoproc config is using the port 27017



