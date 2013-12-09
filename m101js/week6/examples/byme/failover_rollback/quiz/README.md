# Failover and Rollback

What happens if a node comes back up as a secondary after a period of being offline and the oplog has looped on the primary?


(OK) The entire dataset will be copied from the primary

A rollback will occur

The new node stays offline (does not re-join the replica set)

The new node begins to calculate Pi to a large number of decimal places
