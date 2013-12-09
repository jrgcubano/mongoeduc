# Sharding + Replication

- Notes:
Take in count the write concern behavior in a sharded enviroment. If we use j, w (majority) or wtimeout, etc.

- Question:
uppose you want to run multiple mongos routers for redundancy. What level of the stack will assure that you can failover to a different mongos from within your application?


mongod

mongos

(OK) drivers

sharding config servers

