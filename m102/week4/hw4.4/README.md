# Homework 4.4

We will now retire the first member (@ port 27001) from the set (remove it that is). 
As a first step to doing this we will shut it down. (Given the rest of the set can maintain a majority, we can still do a majority reconfiguration if it is down.) 
We could simply terminate its mongod process, but if we use the replSetStepDown command, the failover may be faster. So that is a good practice albeit not essential. Connect to member 1 (port 27001) in the shell and run:
> rs.help()
> rs.stepDown(300)
Then cleanly terminate the mongod process for member 1. 
Next, go to the new primary of the set. Run rs.status() to check that things are as you expect. Then, reconfigure to remove member 1. Tip: if new to javascript you may find the Array.shift() method helpful for example try this in the shell:
> my_array = [‘a’,’b’,’c’]
> my_array.shift()
> my_array
>
When done, run
> homework.d()
and enter the result. (If you ran the shell without week4.js on the command line, run it again with that.)

# Solution
rs.remove("localhost:27001")

# Answer
6