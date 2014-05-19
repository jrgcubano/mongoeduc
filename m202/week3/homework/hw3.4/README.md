# Homework: 3.4: Using oplog replay to restore

Suppose that last night at midnight you took a snapshot of your database with mongodump. At a later time, someone (not you) accidentally dropped the only collection in the database. You wish to restore the database to the state it was in immediately before the collection was dropped by replaying the oplog.

Which of the following are steps you should take in order for this to be successful? Check all that apply.


The writes that occurred before the backup will cause problems if replayed, because they will cause the database to deviate from the state it was in before the mongodump, so they need to be excised from the replay.
The mongodump will be repeated when the oplog is replayed, potentially overwriting the original mongodump, so that operation needs to be removed from the oplog.
The writes after the mongodump will need to be sorted, as they may not be in order.
(OK) The db.collection.drop() command will still be in the oplog, and will need to be avoided.
(OK) Ensure that any writes that occurred after the drop() command are not replayed (you might need to deal with these later), because these might lead to unexpected or inconsistent results.