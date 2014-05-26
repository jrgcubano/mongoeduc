# Homework: 4.2: Optimizing a secondary for special case reads

Suppose you have an application on which you want to run analytics monthly. The analytics require an index and for performance reasons you will create the index on a secondary. Initiate a replica set with a primary and only one secondary. Create an index on the secondary only. The index should be on the "a" field of the "testDB.testColl" collection.

When you have created the index on the secondary, test with MongoProc to be sure you've completed the problem correctly and then submit.

Note: If you have any documents in the testDB.testColl collection when you test or submit with MongoProc they will be removed.

# Answer

- Start mongod
mkdir 1 2 3
sudo ./init_instances.sh

- Config replicaSet:
	. mongo --port 27017 < init_config.js
	. On the mongo shell add an arbiter: rs.addArb("localhost:27019")
- Access the db, insert some document, and check that the replicaSet is working
use testDB
// test
db.testDB.testColl.insert({"a":"a"})
db.testDB.testColl.remove({"a":"a"})

- Index on the secondary only
	. Stop secondary mongod on port 27018:
		- ps -A | grep mongod 
		- sudo kill pid (on port 27018)
	. Start secondary without --replSet 202 and add the index to the collection
		- mongod --logpath "2.log" --dbpath 2 --port 27018 --smallfiles --oplogSize 64 --fork
		- mongo --port 27018
		- use testDB
		- db.testColl.ensureIndex({"a" : 1})
		- db.system.indexes.find() to check the new index
	. Stop the standalone mongod on port 27018:
		- ps -A | grep 
		- sudo kill pid (on port 27018)
	. Start the secondary with the --repSet m202
		- mongod --replSet m202 --logpath "2.log" --dbpath 2 --port 27018 --smallfiles --oplogSize 64 --fork
	. Use MongoProc to check the results. Ensure that mongoproc config is using the port 27017
