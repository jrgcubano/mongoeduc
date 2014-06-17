# Quiz: Filtering out connections from log files

Please download and extract the handout if you have not already. Suppose you are diagnosing a performance problem and this is the log you have. Investigate whether the problem is caused by too many connections. Does the log show a point in time when the number of open connections went into the thousands?

# Answer 
Probably the first thing to do is glance at anything with the word "connection" in it.
grep connection mongod.log | less
Most of these lines resemble this:
Apr  5 06:39:57 m202-ubuntu mongod.27017[808]: Fri Apr  5 06:39:57
[initandlisten] connection accepted from 127.0.0.1:15991 #8952 (59 connections
now open)
We're only interested in the number of connections, so let's focus on the 59 connections now open part. There are many ways to do this, but one is to take advantage of the fact that . matches any character in grep:
$ grep '(. connections now open' mongod.log | wc -l
      19
$ grep '(.. connections now open' mongod.log | wc -l
   49548
$ grep '(... connections now open' mongod.log | wc -l
       0
$ grep '(.... connections now open' mongod.log | wc -l
       0
So most of the time, the number of open connections was a 2-digit number, and it was never 3 or 4 digits. 100 connections is pretty reasonable, so the performance problem is probably being caused by something else.'
