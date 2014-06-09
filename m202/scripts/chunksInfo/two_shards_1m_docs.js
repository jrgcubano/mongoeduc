// NOTE: This is not pure Javascript and cannot be run as such
// It is a series of instructions, some of which need to be run from the command line, others must be run from a MongoDB shell
// The comments before the instructions will describe where to run each piece                
// The command line instructions assume that the MongoDB binaries are in your current working directory on a Unix-like system

// Start a mongodb shell from the command line, this will be used to create your test cluster

./mongo --nodb

// Once you have a mongo shell, create a test cluster
// We'll just start with 2 shards, and a small chunk size (handy for getting lots of chunks and testing the balancer)
cluster = new ShardingTest({shards: 2, chunksize: 1});         
// You will now see a lot of logging on this terminal, and I find it useful to keep it this way when testing

// So, start a new mongo shell -- this time connecting to the mongos you just created
./mongo --port 30999                                                                 

// Now that we again have a mongo shell, this time connected to the mongos, let's call the DB chunkTest
use chunkTest;     
// enable sharding on the DB
sh.enableSharding("chunkTest");
// Then create a sharded collection, we'll just call the collection "foo"
// Since this is just a test, we will shard based on _id - this would generally be a bad idea for production
sh.shardCollection("chunkTest.foo", {"_id" : 1});
// Optional - uncomment the following to disable the balancer before inserting - this will put all data on one shard initially
// sh.stopBalancer();    
// Check the balancer state
sh.getBalancerState();
// Now insert 1,000,000 docs (increase as necessary) - this may take a while
// In this case, I've put in a couple of random fields, and overridden the _id with the integer counter in the for loop
for(var i = 0; i <= 1000000; i++){db.foo.insert({"_id" : i, "date" : new Date(), "otherID" : new ObjectId()})};
// and that's it - you now have a 2 shard cluster with 1,000,000 docs to play with