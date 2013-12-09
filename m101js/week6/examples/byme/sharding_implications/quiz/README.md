# Implications of Sharding on development

- Notes:
Things to remember:
. Every doc includes the sharded key
. shard key is immutable
. you need a index that stand will the shard key (student_id). Not multikey index 
. when you do an update you have to specify the shardkey or use multi = true. If you use multi without the 
shardkey, then it sends the update to all the shards
. No use shard key in a operations, implies scather gather (send to all shard nodes)
. you cant have a unique key - unless if part of the shard key.

- Question:
Suppose you wanted to shard the zip code collection after importing it. You want to shard on zip code. What index would be required to allow MongoDB to shard on zip code?


(OK) An index on zip or a non-multi-key index that starts with zip.

No index is required to use zip as the shard key.

A unique index on the zip code.

Any index that that includes the zip code.
