# Week7 Data Integrity, Authentication, and Security

Data integrity (Write concern)
==============================
- w : 0, 1, 2, 3, all, majority
- w : 2 (safer) process: Driver -> Write (P) -> Apply (P) -> Replicate (S1) -> Apply (S1) -> Replicate (S2)
- w : majority: in a replicat set of 3 nodes (1P, 2S), majority is a equivalent to write concern 2.

Data integrity (Write concern with journaling and fsync)
========================================================
Persistence to disk
- journaling : with this enabled fsync : true = j : true. In w : 1 for example Driver -> Write (mongod) -> Gle (j:true) -> Apply (in mem on mongod) -> Write to journal -> Gle (Response)

Data integrity (Version notes)
==============================
- 2.4: 
	- Object check is on by default
		- slight overhead, marginal
		- much safer
	- Upsert -> $set On Insert (If and only if, insert, then set)
	- $push -> $sort, $each
- 2.6:
	- Complete rewrite of queries, updates, writes in general 
	- field ordering will be respected, maintained:
		- _id is always first
		- renaming fields may cause re-ordering
	- better job of enforcing field name restriccions: 
	- Improvements to $push, $slice, etc.

dp.CurrentOp()
==============
- Limitations:
	- Point in time
	- Always list long running ops (replication)
	- May not list namespace for non-active ops (db.collection)
	- potentially huge output
- Informational use (see docs on manual for examples)
- Taking actions based on output:
	- killin ops
- Do not kill:
	- replication ops
	- connection ops
- Killing Long Running Ops (script example)

```javascript
killLongRunningOps = function(maxSecsRunning) {
	currOp = db.currentOp();
	for (oper in currOp.inprop) {
		op = currOp.inprog.inprog[oper-0];
		if(op.secs_running > maxSecsRunning && op.op == "query" && !op.ns.startWidth("local")) {
			print("Killing opID: " + op.opid
							+ " running over for secs: "
							+ op.secs_running);
			db.killOp(op.opid);
		}
	}
}
```

- 2.6 notes:
	- maxTimeMS(): max time to execute one operation
	- currentOp will list background index process

Examining connections in Log Files
===================================
- mongod, mongos -> Log files (logpath) 
- using mongo -> show log to show the last lines of the log
- Tips to filter logs:
	- find "exception" or "socket"
	- wc -l mongod.log (to count lines)
	- grep accepted mongod.log | wc -l (to count lines with accepted)
	- grep 'end.connection' mongod.log | wc -l
	- grep -v 'end.conn' mongod.log | grep -v 'accepted.from' | wc -l or less
	- grep -v 'end.conn' mongod.log | grep -v 'accepted.from' > new-file.log
	- grep exceptions new-file.log | wc -l
	- grep exception new-file.log | grep -iv socket | wc -l
	- grep -v oplog mongod.log | grep -o "[0-9]\+ms" | sort -n | tail
	- grep -v writeback <filename> | grep -v oplog | grep -o "[0-9]\+ms" | sort -n | tail -n 20 | uniq | xargs -n 1 -I x grep x <filename> on linux 
	- egrep "[0-9]{3,}ms" mongo.log | awk '{print $NF, $0}' | sort -n | tail -n 5 
	- grep connectio mongod.log | grep acce | grep -o "Apr 5 ....." | sort | uniq -c (to get connections with minutes .....)
	- grep connectio mongo34 | grep acce | grep -o "Jul  6 ....." | sort | uniq -c

Analysing Log Files with mtools
================================
- http://blog.rueckstiess.com/
- sudo pip install mtools
- mloginfo: 
	- mloginfo mongod.log --queries
- mlotqueries:	
	- $ mplotqueries mongod.log (graph)
	- $ mplotqueries mongod.log --type rsstate (for replica sets state, line colors like mms)
	- $ mplotqueries mongod.log --overlay (then if you use the last command line you overlay the new result)
	- $ grep getlasterror mongod.log | mplotqueries --overlay

MongoDB Native Authentication
=============================
- LDAP and Kerberos is the other option 
- Native:

- Roles:
	- admin database
	- normal database
- v2.4:
	- userAdmin
	- clusterAdmin
- v2.6:
	- user defined roles, admin database only
	- all users move to the admin database

Authentication in Sharded Clusters
==================================
- all admin commands are done in mongos
- example: 
	- 3 shards -> "test-rs0" (1P, 2S), "test-rs1" (1P, 2S) and "test-rs2" (1P, 2S) with 3 config servers
	- two databases shardTest and authTest
		- use shardTest and insert some data to foo collection. The primary database lives on test-rs0.
		- use authTest and insert some document to foo collection. This database is not sharded. The primary database lives on test-rs1.
	- use shardTest
	- db.bar.insert({a : 1})
	- sh.status()
	- nothing has changed because the collection is not sharded.	
	- the bar collection only exists in his primary shard


Authentication in Sharded Clusters (Users)
==========================================
- admin database live in config servers (the three of them)
- if you add a user to a database that is not sharded, it will be added only on the shard where the database primary lives.
- you will use mongos to connect and authenticate. Mongos will find were lives that user for the specific database on the sharded enviroment.
- v2.6:
	- puts everything about users in the config database on the config servers


Authorization (Concepts)
========================
- Built-in Roles -> 
- Custom Roles:
	- principle of least privilege
	- mapping LDAP users or active directory to mongodb, etc
- Scope of a Role:
	- database specific scope
	- cluster scope: on the context of roles the cluster is anything beyond the individual host and individual database. So 
	if you want to make changes to a replicaset that is also considered a cluster-wide scope.
	- multi database scope
	- admin scope
- Privilege: specified resource, set of actions that you can perform on those resources.
	- Resource: a database, collection or a cluster (replicaset or sharded, etc).
	- Action: command or method that the user is allowed to perform on the resource.

Authorization (Roles)
=====================
- Built-In Roles:
	- read role: 
		- access to read all non-system collections
		- access to system.indexes, system.js, system.namespace
	- readWrite
		- all access that is granted to read
		- ability to modify data on all non-system collections
	- dbAdmin : admin functions
		- drop a collection
		- cannot read from that collection
		- etc
	- userAdmin:
		- create any user and grant any permissions to those users, inclused him self.
		- if you are a superuser in the admin database you can access anything.
	- dbOwner (combination readWrite, dbAdmin and userAdmin)


	- Cluster Resource:
		- admin database
		- cluster administration roles
	- All/Any database resources
		- admin database
		- mirror their single database counterparts

	- Backup role: use for mms backup agent and mongodump
	- Restore role: use for mms backup agent and mongodump
	- Root role: combine any class or super user role
	- Cluster Monitor role: for the mms monitoring agent


Authorization (Demo)
====================
Example files on /notes/authorization_demo.

3 config files for a replicaSet

- mongod -f mongod-27017.conf
- mongo --port 27017
- rs.initiate() and wait to be a primary
- use admin
- db.createuser({ user : "siteUserAdmin", pwd : "password", roles : [{role : "userAdminAnyDatabase", db : "admin"}]})

- disconnect

- mongod -f mongod-27020.conf
- mongod -f mongod-27022.conf
- mongo -u siteUserAdmin -password --authenticationDatabase admin (not authorized on admin)
- use admin 
- show users
- rs.status() (not authorized on admin)
- use admin
- db.createUser({user : "replSetManager", pwd : "password", roles : [{role : "clusterManager", db : admin }]}) -> (we use clusterManager role, because allows us to configure replicaSet (replSetConfigure) )

- disconnect

- mongo -u replSetManager -password --authenticationDatabase admin (not authorized)
- rs.status() 
- rs.add("education.local:27020")
- rs.add("education.local:27022")
- rs.status()
