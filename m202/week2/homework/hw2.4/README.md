# Homework 2.4 Reclaiming disk space

Note: MongoProc validation for this exercise requires that you are running MongoDB 2.6

Over time a MongoDB database can become fragmented and cause reduced storage efficiency.

In this problem we have provided you with an already fragmented database. You will want to extract the given handout and set mongod's dbpath to the appropriate folder.

Your goal in this homework is to increase storage efficiency and reclaim disk space. You may use any method learned thus far to accomplish this goal. However, please do not tamper (remove/update/insert) with the database given apart from querying it to find out more information about the fragmented components.

You are encouraged to use MongoProc to continuously test your progress until you are ready to grade the homework.

Useful Formulas

Collection Storage Efficiency:
db.collection.stats().size/db.collection.stats().storageSize
Database Storage Efficiency:
(db.stats().dataSize + db.stats().indexSize) / db.stats().fileSize

# Solution
Database: fragDB
Command: db.repairDatabase()
- Before:
db.fragColl.stats().size/db.fragColl.stats().storageSize
0.14289938663772606
(db.stats().dataSize + db.stats().indexSize) / db.stats().fileSize
0.12821715218680246
- After:
0.8213309503784693
0.45167418888636995

# Example javascript to do the task and get info about fragmentation
$ mongo fragDB task.js

// Get a the current collection size.
var storage = db.fragColl.storageSize();
var total = db.fragColl.totalSize();

print('Storage Size: ' + tojson(storage));

print('TotalSize: ' + tojson(total));

print('-----------------------');
print('Running db.repairDatabase()');
print('-----------------------');

// Run repair
db.repairDatabase()

// Get new collection sizes.
var storage_a = db.fragColl.storageSize();
var total_a = db.fragColl.totalSize();

print('Storage Size: ' + tojson(storage_a));
print('TotalSize: ' + tojson(total_a));

