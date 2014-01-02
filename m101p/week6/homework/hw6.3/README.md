# Homework 6.3

Which of the following statements are true about choosing and using a shard key:


(OK) The shard key must be unique

(OK) There must be a index on the collection that starts with the shard key.

Mongo can not enforce unique indexes on a sharded collection other than the shard key itself.

(OK) Any update that does not contain the shard key will be sent to all shards.

You can change the shard key on a collection if you desire.