# Quiz: Examining connections in log files

Download and extract the handout if you haven't already. In the video you saw how to find out which time intervals had the most connections. Now find out which client hosts are making the most connections.

# Answer
From the video, the pipeline for grouping by arrival time is
grep connectio mongod.log | grep acce | grep -o "Apr  5 ...." | sort | uniq -c
The first two greps filters the lines we're interested in, the grep -o selects the field we want to group by, and the sort | uniq -c shows the number of times each line occurs. To group by client host instead of arrival time, we'll just select a different field to group by.
grep connectio mongod.log | grep acce | head -n 3
Apr  5 06:39:57 m202-ubuntu mongod.27017[808]: Fri Apr  5 06:39:57
[initandlisten] connection accepted from 127.0.0.1:15991 #8952 (59 connections
now open)

Apr  5 06:40:02 m202-ubuntu mongod.27017[808]: Fri Apr  5 06:40:02
[initandlisten] connection accepted from 192.0.2.2:63301 #8953 (59 connections
now open)

Apr  5 06:40:02 m202-ubuntu mongod.27017[808]: Fri Apr  5 06:40:02
[initandlisten] connection accepted from 192.0.2.2:63303 #8954 (59 connections
now open)
We want the IP address after "accepted from".
grep connectio mongod.log | grep acce | grep -o 'from .*' | cut -f2 -d' '  | cut -f1 -d: | sort | uniq -c
2837 127.0.0.1
 110 192.0.2.10
16120 192.0.2.2
2621 192.0.2.3
2677 192.0.2.4
 126 192.0.2.5
 107 192.0.2.6
 122 192.0.2.7
 133 192.0.2.8
Finally, you can sort this output numerically to quickly see which hosts have the highest connection counts:
grep connectio mongod.log | grep acce | grep -o 'from .*' | cut -f2 -d' '  | cut -f1 -d: | sort | uniq -c | sort -n
 107 192.0.2.6
 110 192.0.2.10
 122 192.0.2.7
 126 192.0.2.5
 133 192.0.2.8
2621 192.0.2.3
2677 192.0.2.4
2837 127.0.0.1
16120 192.0.2.2

