# Quiz: Unbalanced chunks overview

Consider the diagram below depicting the distribution of chunks across a sharded cluster. For each chunk, the number (16, 32, or 64) defines the size of the chunk in MB. Assuming no new chunks are created, which of the following best describes what actions the balancer will take during the next balancing round?

Diagram with the chunks in each shard:

SHARD1: 32 - 32 - 32
SHARD2: 16 - 16 - 16 - 16 - 16 - 16 - 16 - 16
SHARD3: 64 - 64



The shards are balanced. There will not be a balancing round until more chunks are created.

The balancer will migrate a chunk from shard 1 to shard 2.

(OK) The balancer will migrate a chunk from shard 2 to shard 3.

The balancer will migrate a chunk from shard 3 to shard 1.

The balancer will migrate a chunk from shard 1 to shard 3.

Answer:
=======
Ignore the numbers and all you have to do is really take into account how many chunks have each shard. 
It will move chunks from the shard with the most to the shard with least. 