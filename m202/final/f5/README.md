# Final: Question 5: Failed replica set initiation

Please examine the attached log files. In this scenario, a replica set is initiated on one server with rs.initiate(). Once it successfully initialized, a second member was spun up and added to the replica set with rs.add().

Before it was successfully added, there was a connection problem. What was it?



A network partition

One of the members went down while the second member was being added to the set

The replica set names in the configs for the two members were different

(OK) There were too many connections to one of the members (rs1.log primary, rs2.log secondary)

The replica set config points to the wrong IP address
