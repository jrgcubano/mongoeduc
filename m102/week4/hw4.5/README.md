# Homework 4.5

Note our replica set now only has an even number of members, and that is not a best practice. However, to keep the homework from getting too long we’ll leave it at that for now, and instead do one more exercise below involving the oplog.

To get the right answer on this problem, you must perform the homework questions in order. Otherwise, your oplog may look different than we expect.

Go to the secondary in the replica set. Run this to verify you are on the secondary:

> // expect to get back false as we are not primary
> db.isMaster().ismaster
false
Switch to the local database and then look at the oplog:
> db.oplog.rs.find()
If you get a blank result, you are not on the right database.

Note: as the local database doesn’t replicate, it will let you query it without entering “rs.slaveOk()” first.

Note: you may wonder why the number of lines in the oplog is the number you see here. See the homework answer video when answers are posted for more information if curious.

Next look at the stats on the oplog to get a feel for its size:

> db.oplog.rs.stats()
What result does this expression give when evaluated?
db.oplog.rs.find().sort({$natural:1}).limit(1).next().o.msg[0]


N

n

Blank

(OK) R -> "R from Reconfig set"

r

l