# Week 4 Fault Tolerace and Availability

Notes:
=====

# Maintenance:

- Example: (Replica set with 1 P, 2 S.) 
	- In case of a Secondary: Shut it down, start mannually the "mongod" process without --replSet on a different port. Do some maintenance and rejoin the replicaSet again using the original --replSet and the original port.
	- In case of a primary: rs.StepDown() the primary and wait the election of a new primary. Use the same process of a secondary and join again to the replicaSet.

- Use Cases in maintenance:
	- Upgrade binaries (yam, apt-get, manual, etc). Use the same process commented earlier. 
	- Index builds (sp pre 2.6): 
		- build on secondaries first.
		- choose: background build on primary or step down primary, repeat the process
	- Compact/Repair: same process...
 
# Load Balancers in mongodb
- No, if your using Replica Sets
- Yes, with caveats
	- Sharding (two scenarios):
		- one mongos goes down
		- the load balancer close connections to one mongos becouse its full (1000 client connections for example). 
	- Example balancers (Netscaler, F5, Zeus, Riverbed, etc)

# Driver options 
- Connections: 
	- connection time out: balancing act. 
		- How busy is the server/cluster?
		- How quickly do you need to fail? 	
		- Throw exception or retry? : Throw and inform to the client that you are going to retry in some time..
	- connections per host: 50 connections. 
		- Example of 200 clients x 50 connections = 10000 = 10gb of ram. 
		- Control the ulimit to open x file descriptors, etc
- Socket timeout: 
	- How long to wait for a response on a open socket? (infinite).
- High availability: 	
	- Example: Mongos used by a MongoClient driver ("host1 : 27017, host2: 27017, host3: 27017"). In case of failover in one host, the balancer 
	changes to other and continues operating. If some query that is using a cursor on the affected node is on the middle of a process we need a good throw exception (cursor not found). 

# Connection management
- In Standalone mongod: number of operations that the connected clients are doing dictate the number of connections or maximum allowed. 

- In ReplicaSets: We have connections from clients, sync, administrative, replica sets hearbeats, etc. If we use mms, we need more connections to monitor the replica set.
	- you need to optimize the primary, because in the most of cases, handle the most part of connections.
	- Every connection = 1mb of ram
	- max limit dictated by:
		- ulimit (open file descriptors)
		- hardcode, 20 000 cap.
	
- In Sharded clusters: We have connections from mongos, administrative, sync, other primaries in a different cluster, config servers, mms, etc.
	- Formula for maximum mongos connections. You need to know:
		- max connections on the primary (ulimit, 1mg of memory per connection, hardcode cap 20000). MaxPrimaryConnections (20000)
		- number of mongos processes? (example 100 = numMongos)
		- number of secondaries in a replica set? (example 2 = numSecondaries)
		- other connections (example 2 = numOther)
		- result : (maxPrimaryConnections - (numSecondaries x 3) - (numOther x 3)) / numMongos = (20000 - (2 x 3) - (2 x 3)) / 100 = 199.88 ~ rounded to an absolut maximum maxCons=190. That give you 19 000 maximum connections from all your mongoses. And 19 out of 20000 is approximately 90% of utilization level. That give you a 10% buffer. This configuration protect your shards and give connection timeouts, etc. And basically not service any connections beyond 190, in order to protect the databases behind them. 


# Read Preferences (for availability)

- ReplicaSet: 1P & 2S: the default is that all read operations goes to the "primary".
- In case of a failover or some stepdown, the "eventual consistency" shows up.
- Read preferences:
	- Primary preferred
	- Secondary (only)
	- Secondary preferred
	- Nearest

# Rollback

- Web: comerford.cc/wordpress/2012/05/28/simulating-rollback-on-mongod/

- Example: 
	- 1 Primary, 1 Secondary and 1 Arbitrer. 
		- Situation: Lag between the primary and the secondary, so the writes being applied to the primary, they're not making it immediately down to the secondary. 
		- Question 1: What happens when the primary crashes?
		- Answer 1: there will be X number of writes that made it to the primary, but were not replicated to the secondary. Not more replication. The secondary are promoted to a primary.
		- Question 2: What happens when you fix this problem and the old primary comes back?
		- Answer 2: Now the old it's going to rejoin the set and attemp to become a secondary. It will talk to the new primary and it will try to discover a common point in the oplogs. It finds a common point but it notices that it has operations after that common point and this new primary doesn't. So here the old primeray goes into a "rollback state". It will dump that extra data to the disk and then rejoin the set as "Secondary state" stoping the rollback. This will happen automatically in case that the extra writes and the ammount of data involved no exceed 300mgs, in other case stay in the rollback state and waits the manual database administrator action.


# Other mongoDB states (manual)
