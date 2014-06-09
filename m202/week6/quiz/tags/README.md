# Quiz: Simple tag-based sharding example

Spin up a sharded cluster with three shards. In a database called houses create collections named lannister, stark, and targaryen. Set up your cluster so that the collection representing each house is pinned to one of the shards.

# Solution
Here is one possible solution to the Game of Thrones problem we posed. Please note that we are passing a configuration document to ShardingTest. This will ensure the mongods are created using small files and without preallocating data files and journal files. It should eliminate problems with disk space that some students have reported when using ShardingTest.

```javascript
config = { d0 : { smallfiles : "", noprealloc : "", nopreallocj : ""}, d1 : { smallfiles : "", noprealloc : "", nopreallocj : "" }, d2 : { smallfiles : "", noprealloc : "", nopreallocj : ""}};
cluster = new ShardingTest( { shards : config } );
// shard db
sh.enableSharding("houses");

// shard collections
sh.shardCollection("houses.stark", {dire_wolves_owned:1});
sh.shardCollection("houses.lannister", {debt_owed:1});
sh.shardCollection("houses.targaryen", {followers:1});

// Insert sample data
use houses;
var bulk = db.stark.initializeUnorderedBulkOp();
for (var i=0; i < 100000; i++) { bulk.insert({dire_wolves_owned: Math.random()}); }
bulk.execute();

bulk = db.lannister.initializeUnorderedBulkOp();
for (var i=0; i < 100000; i++) { bulk.insert({debt_owed: Math.random()}); }
bulk.execute();

bulk = db.targaryen.initializeUnorderedBulkOp();
for (var i=0; i < 100000; i++) { bulk.insert({followers: Math.random()}); }
bulk.execute();

sh.addShardTag("shard0000", "sta");
sh.addShardTag("shard0001", "lan");
sh.addShardTag("shard0002", "tar");

sh.addTagRange("houses.stark", {dire_wolves_owned:MinKey}, {dire_wolves_owned:MaxKey}, "sta");
sh.addTagRange("houses.lannister", {debt_owed:MinKey}, {debt_owed:MaxKey}, "lan");
sh.addTagRange("houses.targaryen", {followers:MinKey}, {followers:MaxKey}, "tar");
```

