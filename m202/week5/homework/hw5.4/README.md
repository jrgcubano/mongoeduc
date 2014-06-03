# Homework: 5.4: Automatic chunk splitting

In a sharded cluster, which of the following can keep large chunks from being split as part of MongoDB's balancing process? Check all that apply.


(OK) Frequent restarts of all mongos processes relative to the number of writes

(OK) If there are not enough distinct shard key values

(OK) If one of the config servers is down when a mongos tries to do a split

The average size of the documents in the chunk

The number of shards in the cluster
