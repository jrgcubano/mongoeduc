# Final: Question 3: Replica Set

Suppose you have a 3 node replica set where 2 of the nodes are in a data center that goes down and stays down indefinitely. Your job is to bring your third server to a place where it can accept writes.

For this problem, we'll only need a replica set.

Start by running the following lines and waiting for each to complete.

Note: You must wait for rst.startSet() to finish before executing rst.initiate(). You will know when it is finished when the log shows: "[rsStart] replSet can't get local.system.replset config from self or any seed (EMPTYCONFIG)".

If you are seeing log messages appear you can still paste in each command.

$ mongo --nodb
> options = {
    nodes: 3,
    startPort: 27017,
    nodeOptions: {
        smallfiles: "",
        noprealloc: "",
        nopreallocj: ""
    }
};
> rst = new ReplSetTest(options);
> rst.startSet();
> rst.initiate();
Then click "Initialize" in MongoProc. This will tear down the servers on ports 27018 and 27019. Your job is to get the server on 27017 up, running, and able to receive writes.

Please do not spin up a server on localhost:27018 or localhost:27019 or access anything in the directories where those servers pointed before they were shut down. We want to simulate a situation where a data center disappears and it is impossible to access anything there. Generally, we prefer to give you a setup where we can eliminate "wrong" ways of solving a problem, but that is difficult to do in this case.

Solution
--------
Steps to resolve the problem.

- Start 5 node replica set
mongo --nodb
	options = {
	    nodes: 5,
	    startPort: 27017,
	    nodeOptions: {
	        smallfiles: "",
	        noprealloc: "",
	        nopreallocj: ""
	    }
	};
rst = new ReplSetTest(options);
rst.startSet(); (remember to wait until this finish to execute the other command)
rst.initiate();

- Seed the problem with MongoProc (from mongodb team). This simulates the 27018 and 27019 shut down.
- Remove replicaSet members:
rs.remove("jhome.local:27018") (27018, 27019, 27020 and 27021) from the primary on port 27017.
- Solved


