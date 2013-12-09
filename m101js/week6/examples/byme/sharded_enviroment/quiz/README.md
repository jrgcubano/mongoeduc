# Building a Sharded Environment

- Notes:
You need a index in the collection to start working with sharding.

- Question:
If you want to build a production system with two shards, each one a replica set with three nodes, how may mongod processes must you start?


2

6

7

(OK) 9: 
       3 replica set x 2 shards 
     + config server x 2 shards
     + connector 
