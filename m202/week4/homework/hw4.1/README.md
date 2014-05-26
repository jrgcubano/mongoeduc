# Homework: 4.1: Limiting connections to a primary

Suppose you have a sharded cluster for which each shard is a 3-node replica set running MongoDB 2.6. You are concerned about limiting the number of connections in order to help ensure predictable behavior. Given the constraints of your system, you have decided to use 10GB to determine the maximum connections on the primary.

Using the formula discussed earlier in this chapter, determine the value to which you should set maxConns for the mongos in this cluster if you want to limit primary connections to a ~90% utilization level. Your cluster is using 64 mongos and the number of other possible connections to a primary is 6.

Please calculate the maxConns value to achieve 90% utilization and round down to the nearest integer. Enter only the integer in the box below or your answer will be considered incorrect.

Note: For consistency with the lesson video, please assume that 10,000 connections consume 10GB of RAM.

# Answer

- Data:
	- sharded cluster, each shard x 3 node replica set (mongodb 2.6)
	- 10 gb of RAM
	- 10,000 connections consume 10GB of RAM.
	- numMongos = 64 mongos
	- numOther = 6 other possible connections to a primary

- Formula:
	- MaxConns = (maxPrimaryConnections - (numSecondaries x 3) - (numOther x 3)) / numMongos 
		 = (10000 - (2 x 3) - (6 x 3)) / 64
		 = 155,875 -> 100 % , So 90% = 140.2875 ~ 140.
