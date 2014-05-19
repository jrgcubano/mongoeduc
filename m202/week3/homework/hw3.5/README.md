# Homework 3.5 Replaying the oplog
This problem will be a hands-on implementation of the last problem.

The backupDB database has one collection, backupColl. At midnight every night, the system is backed up with a mongodump. Your server continued taking writes for a few hours, until 02:46:39. At that point, someone (not you) ran the command:

> db.backupColl.drop()
Your job is to put your database back into the state it was in immediately before the database was dropped, then use MongoProc to verify that you have done it correctly.
You have been provided with a server directory in the backuptest.tar.gz file that includes your (now empty) data files, the mongodump file in backupDB.tar.gz, and a mongod.conf file. The conf file will set the name of your replica set to "BackupTest" and the port to 30001. Your replica set must have these settings to be graded correct in MongoProc. You may configure the host setting for MongoProc if necessary.

Use MongoProc to evaluate your solution. You can verify that your database is in the correct state with the test button and turn it in once you've passed.

This assignment is fairly tricky so you may want to check this stackoverflow question and answer.

# Answer
```
$ mongod -f mongod.df30592c9ae3.conf
$ mongorestore --host 127.0.0.1 --port 30001 --collection backupColl --db backupDB backupColl.bson 
$ mkdir oplogD
$ mongodump --host 127.0.0.1 --port 30001 -d local -c oplog.rs -o oplogD
$ mkdir oplogR
$ mv oplogD/local/oplog.rs.bson oplogR/oplog.bson
$ bsondump oplogR/oplog.bson > oplog.readable
$ cat oplog.readable | grep "drop"
$ mongorestore -h 127.0.0.1 --port 30001 --oplogReplay --oplogLimit 1398778745:1 oplogR

```

# Stackoverflow (example question and answer)
- Question
Is it possible to modify the MongoDB oplog and replay it?

A bug caused an update to be applied to more documents than it was supposed to be, overwriting some data. Data was recovered from backup and reintegrated, so nothing was actually lost, but I was wondering if there was a way to modify the oplog to remove or modify the offending update and replay it.

I don't have in depth knowledge of MongoDB internals, so informative answers along the lines of, "you don't understand how it works, it's like this" will also be considered for acceptance.

- Answer:
One of the big issues in application or human error data corruption is that the offending write to the primary will immediately be replicated to the secondary.

This is one of the reasons that users take advantage of "slaveDelay" - an option to run one of your secondary nodes with a fixed time delay (of course that only helps you if you discover the error or bug during the time period that's shorter than the delay on that secondary).

In case you don't have such a set-up, you have to rely on a backup to recreate the state of the records you need to restore to their pre-bug state.

Perform all the operations on a separate stand-alone copy of your data - only after verifying that everything was properly recreated should you then move the corrected data into your production system.

What is required to be able to do this is a recent copy of the backup (let's say the backup is X hours old) and the oplog on your cluster must hold more than X hours worth of data. I didn't specify which node's oplog because (a) every member of the replica set has the same contents in the oplog and (b) it is possible that your oplog size is different on different node members, in which case you want to check the "largest" one.

So let's say your most recent backup is 52 hours old, but luckily you have an oplog that holds 75 hours worth of data (yay).

You already realized that all of your nodes (primary and secondaries) have the "bad" data, so what you would do is restore this most recent backup into a new mongod. This is where you will restore these records to what they were right before the offending update - and then you can just move them into the current primary from where they will get replicated to all the secondaries.

While restoring your backup, create a mongodump of your oplog collection via this command:

mongodump -d local -c oplog.rs -o oplogD

Move the oplog to its own directory renaming it to oplog.bson:

mkdir oplogR
mv oplogD/local/oplog.rs.bson oplogR/oplog.bson
Now you need to find the "offending" operation. You can dump out the oplog to human readable form, using the bsondump command on oplogR/oplog.bson file (and then use grep or what-not to find the "bad" update). Alternatively you can query against the original oplog in the replica set via use local and db.oplog.rs.find() commands in the shell.

Your goal is to find this entry and note its ts field.

It might look like this:

"ts" : Timestamp( 1361497305, 2789 )

Note that the mongorestore command has two options, one called --oplogReplay and the other called oplogLimit. You will now replay this oplog on the restored stand-alone server BUT you will stop before this offending update operation.

The command would be (host and port are where your newly restored backup is):

mongorestore -h host --port NNNN --oplogReplay --oplogLimit 1361497305:2789 oplogR

This will restore each operation from the oplog.bson file in oplogR directory stopping right before the entry with ts value Timestamp(1361497305, 2789).

Recall that the reason you were doing this on a separate instance is so you can verify the restore and replay created correct data - once you have verified it then you can write the restored records to the appropriate place in the real primary (and allow replication propagate the corrected records to the secondaries).



