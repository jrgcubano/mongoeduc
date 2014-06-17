# Quiz: Authentication in sharded clusters: Users (2)

In a mongodb 2.6 setup, you have a sharded cluster with 3 shards, 's1', 's2', and 's3', plus a mongos and 3 config servers.

One database, 'testDB', has 's3' as its primary shard, and includes only one collection, 'testColl', which is sharded and therefore present on all shards.

One user, "adam", is authorized to login only to the "testDB" database. On which servers can 'adam' connect and log in? Check all that apply.



(OK) The config servers

s1

s2

s3

(OK) The mongos

# Solution (example)

Sharded enviroment with 3 shards (shard0000, 0001, 0002) and 3 config servers.

- mongo --port 30999
- use admin
- db.createUser({user : "adam", pwd : "password123", roles : ["root"]});
- db.auth({user : "adam", pwd : "password123"});
- sh.enableSharding("testDB");
- sh.shardCollection("testDB.testColl", {_id : "hashed"});

- disconnect

- mongo --port 30999
- use testDB;
- db.createUser({user : "m202", pwd : "password123", roles : ["readWrite"]});
- db.auth({user : "m202", pwd : "password123"});
- show users

- disconnect

- mongo --port 30999
- use testDB
- db.auth({user : "m202", pwd : "password123"});
- show users (not authorized)
- db.testColl.insert({a : 2})
- db.testColl.find()

- disconnect

- mongo --port 30000 (shard 0)
- use testDB
- show users (not show nothing)
- db.auth({user : "m202", pwd : "password123"}); (auth failed).

- disconnect

- mongo --port 29000 (config server)
- use testDB
- show users (not authorized on testDB...)
- db.auth({user : "m202", pwd : "password123"});
- db.testColl.find();
- use admin;
- db.auth({user : "adam", pwd : "password123"});
- use testDB
- show users (ok)

