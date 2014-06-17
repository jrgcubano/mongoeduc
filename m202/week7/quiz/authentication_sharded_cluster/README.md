# Quiz: Authentication in sharded clusters: Collections

Launch a sharded cluster (don't worry about authentication). For a database of your choice, create 2 collections. Enable sharding on the database, and shard only one of your collections. Split each collection into several (say, 10) chunks. Query the config database to see where they end up.


# Answer
To give you a little more exposure to mtools, we'll use the mlaunch application as part of this solution. mlaunch is actually a better option for spinning up replica sets and sharded clusters for experimentation than ShardingTest. It's better documented and gives us more control.

$ mlaunch --replicaset --sharded s1 s2 s3
launching: mongod on port 27018
launching: mongod on port 27019
launching: mongod on port 27020
launching: mongod on port 27021
launching: mongod on port 27022
launching: mongod on port 27023
launching: mongod on port 27024
launching: mongod on port 27025
launching: mongod on port 27026
launching: config server on port 27027
replica set 's1' initialized.
replica set 's2' initialized.
replica set 's3' initialized.
launching: mongos on port 27017
adding shards. can take up to 30 seconds...
$ mongo
mongos> use testDB
switched to db testDB
mongos> db.unsharedCollection.ensureIndex( { a : 1 } )
{
	"raw" : {
		"s1/will-macbook-air.local:27018,will-macbook-air.local:27019,will-macbook-air.local:27020" : {
			"createdCollectionAutomatically" : true,
			"numIndexesBefore" : 1,
			"numIndexesAfter" : 2,
			"ok" : 1
		}
	},
	"ok" : 1
}
mongos> db.shardedCollection.ensureIndex( { a : 1 } )
{
	"raw" : {
		"s1/will-macbook-air.local:27018,will-macbook-air.local:27019,will-macbook-air.local:27020" : {
			"createdCollectionAutomatically" : true,
			"numIndexesBefore" : 1,
			"numIndexesAfter" : 2,
			"ok" : 1
		}
	},
	"ok" : 1
}
mongos> sh.enableSharding("testDB")
{ "ok" : 1 }
mongos> sh.shardCollection("testDB.shardedCollection" , { "a" : 1 } )
{ "collectionsharded" : "testDB.shardedCollection", "ok" : 1 }
{ "ok" : 1 }
mongos> for (i=0; i <= 100; i++) { sh.splitAt( "testDB.shardedCollection", { a : 10 * i } ) }
--- Sharding Status ---
mongos> db.chunks.find( { } , { _id : 0 , min : 1 , shard : 1} )
{ "min" : { "a" : { "$minKey" : 1 } }, "shard" : "s2" }
{ "min" : { "a" : 0 }, "shard" : "s3" }
{ "min" : { "a" : 10 }, "shard" : "s2" }
{ "min" : { "a" : 20 }, "shard" : "s3" }
{ "min" : { "a" : 30 }, "shard" : "s2" }
{ "min" : { "a" : 40 }, "shard" : "s3" }
{ "min" : { "a" : 50 }, "shard" : "s2" }
{ "min" : { "a" : 60 }, "shard" : "s3" }
{ "min" : { "a" : 70 }, "shard" : "s2" }
{ "min" : { "a" : 80 }, "shard" : "s3" }
{ "min" : { "a" : 90 }, "shard" : "s2" }
{ "min" : { "a" : 100 }, "shard" : "s3" }
{ "min" : { "a" : 110 }, "shard" : "s2" }
{ "min" : { "a" : 120 }, "shard" : "s3" }
{ "min" : { "a" : 130 }, "shard" : "s2" }
{ "min" : { "a" : 140 }, "shard" : "s3" }
{ "min" : { "a" : 150 }, "shard" : "s2" }
{ "min" : { "a" : 160 }, "shard" : "s3" }
{ "min" : { "a" : 170 }, "shard" : "s2" }
{ "min" : { "a" : 180 }, "shard" : "s3" }
mongos> sh.status()
  sharding version: {
	"_id" : 1,
	"version" : 4,
	"minCompatibleVersion" : 4,
	"currentVersion" : 5,
	"clusterId" : ObjectId("539252354e57d8852eea5d87")
}
  shards:
	{  "_id" : "s1",  "host" : "s1/will-macbook-air.local:27018,will-macbook-air.local:27019,will-macbook-air.local:27020" }
	{  "_id" : "s2",  "host" : "s2/will-macbook-air.local:27021,will-macbook-air.local:27022,will-macbook-air.local:27023" }
	{  "_id" : "s3",  "host" : "s3/will-macbook-air.local:27024,will-macbook-air.local:27025,will-macbook-air.local:27026" }
  databases:
	{  "_id" : "admin",  "partitioned" : false,  "primary" : "config" }
	{  "_id" : "testDB",  "partitioned" : true,  "primary" : "s1" }
		testDB.shardedCollection
			shard key: { "a" : 1 }
			chunks:
				s2	34
				s3	34
				s1	34
			too many chunks to print, use verbose if you want to force print

mongos>)
