# Homework 3.1 Broken node, corrupt data files
In this problem we have provided you with a replica set that is corrupted. You will start out with a working primary, a corrupted secondary, and a working arbiter. Your goal is to recover the replica set by doing the necessary work to ensure the secondary has an uncorrupted version of the data.

Please download and extract the handouts. There are three data directories: one for the primary, secondary, and arbiter. On your host, you will need to run mongods for each of these on ports 30001, 30002, and 30003, respectively. If you initially find that the mongod running on port 30002 is a primary, please step it down. To get the replica set up and running, each node should be launched as follows:

Primary:
mongod --port 30001 --dbpath mongod-pri --replSet CorruptionTest --smallfiles --oplogSize 128
Secondary
mongod --port 30002 --dbpath mongod-sec --replSet CorruptionTest --smallfiles --oplogSize 128
Arbiter
mongod --port 30003 --dbpath mongod-arb --replSet CorruptionTest
For this problem, do not attempt to configure MongoProc's port settings. You may still configure the host setting.
The corrupt data is in the data files found within the mongod-sec directory. Specifically, the testColl collection of the testDB database is corrupted. You can generate an error due to the corruption by running a .find().explain() query on this collection.

Bring the secondary back on line with uncorrupted data. When you believe you have done this, use MongoProc to test and, if correct, submit the homework

# Answer
- Remove all the files from the corrupted secundary.
- Resync with the primary