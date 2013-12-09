# Read Preferences

- Notes:

You can choose the read order (Primary, Secondary or Nearest) in case of 
failover or because you want that order.

- Question:

You can configure your applications via the drivers to read from secondary nodes within a replica set. What are the reasons that you might not want to do that? Check all that apply.


(OK) If your write traffic is significantly greater than your read traffic, you may overwhelm the secondary, which must process all the writes as well as the reads. Replication lag can result.

(OK) You may not read what you previously wrote to MongoDB.

(OK) If the secondary hardware has insufficient memory to keep the read working set in memory, directing reads to it will likely slow it down.

Reading from a secondary prevents it from being promoted to primary.

