# Homework: 3.3: Network partition

Suppose you have a 3 member replica set with the primary in Data Center 2 (DC2) and two secondaries in Data Center 1 (DC1). You have set write concern at w=1. 

Now suppose that your application makes three writes to the primary. However, before these writes have been replicated to either of the secondaries, there is a network partition that prevents communication between DC2 and DC1. The partition lasts for 10 minutes. The application producing writes is able to see all three members of the replica set during the entire network partition between DC2 and DC1. No other problems with your system arise during this period. 

Which of the following are true about the system during the period of the network partition?

(OK) The application will still be able to read data.
The three writes to the primary before the network partition will be replicated to the secondaries when the partition ends.
(OK) The primary in DC2 will step itself down when the partition occurs.
An election will occur when the partition ends.
(OK) The two secondaries will hold an election when the partition occurs.
(OK) The application will still be able to write while the partition is up.
Only reads will be possible while the partition is up.

options = {
    nodes: 5,
    startPort: 27017,
    nodeOptions: {
        smallfiles: "",
        noprealloc: "",
        nopreallocj: ""
    }
};