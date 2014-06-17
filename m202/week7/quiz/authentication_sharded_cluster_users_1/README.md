# Quiz: Authentication in sharded clusters: Users (1)

In a mongodb 2.4 setup, you have a sharded cluster with 3 shards, 's1', 's2', and 's3', plus a mongos and 3 config servers.

One database, 'testDB', has 's3' as its primary shard, and includes only one collection, 'testColl', which is sharded and therefore present on all shards.

One user, "adam", is authorized to login only to the "testDB" database. On which servers can 'adam' connect and log in? Check all that apply.



The config servers

s1

s2

(OK) s3 (becouse is the primary for that database)

(OK) the mongos

# Solution (example)

Sharded enviroment with 3 shards (shard0000, 0001, 0002) and 3 config servers

Add user over admin database
- mongo --port 30999
- sh.status()
- use admin
- db.addUser({user : "adam", pwd : "password123", roles : ["clusterAdmin", "adWriteAnyDatabase", "userAdminAnyDatabase", "dbAdminAnyDatabase"]});
- db.auth({user : "adam, pwd : "password123"});
- sh.enableSharding("testDB");
- sh.shardCollection("testDB.testColl", {_id : "hashed"}};

- discconect 

Add user over testDB. 

- mongo --port 30999
- use testDB;
- db.addUser({user : "m202", pwd : "password123", roles : ["readWrite"]});
- db.auth({user : "m202", pwd : "password123"});
- sh.status()

- disconnect

Test over testDB

- mongo --port 30999
- use testDB
- db.auth({user : "m202", pwd : "password123"});
- db.testColl.insert({a : 1})
- db.testColl.find()
- show users (throw an err "not authorized for query on testDB.system.users")

- disconnect

Connect to shard0000 for test purposes

- mongo --port 30000
- show dbs
- use testDB
- show users 
- use m202
- db.testColl.find()
- db.auth({user : "m202", pwd : "password123"}); (auth fails)
- use testDB
- db.auth({user : "m202", pwd : "password123"}); (ok)
- db.testColl.find()

....