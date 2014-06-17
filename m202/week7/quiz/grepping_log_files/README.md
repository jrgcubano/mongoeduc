# Quiz: Grepping log files

As Adam showed in the video, the slowest operation in this log file was a getLastError with write concern majority, which is problematic if there isn't a majority of replica set members available. What other slow operations are in this log file? Can you identify at least one type of query that is consistently slow? 

# Answer

The following analysis finds one such type of query. You can start with a pipeline that finds the top 5 slowest operations:
egrep '[0-9]{3,}ms$' mongod.log | awk '{print $NF, $0}' | sort -n | tail -n 5
Let's ignore all the getLastError operations. Let's also use -i so we don't have to think about whether it's spelled getlasterror or getLastError:
egrep '[0-9]{3,}ms$' mongod.log | grep -iv getlasterror | awk '{print $NF, $0}' | sort -n | tail -n 5
16872ms Apr  5 16:00:26 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:00:26
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:6213124304229200070 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 51490 locks(micros)
r:32180103 nreturned:10 reslen:2060 16872ms

16965ms Apr  5 15:57:45 m202-ubuntu mongod.27017[808]: Fri Apr  5 15:57:45
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:8343223522342664909 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 48058 locks(micros)
r:32188994 nreturned:10 reslen:2060 16965ms

17017ms Apr  5 16:30:35 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:30:35
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:3380969414085642540 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 52433 locks(micros)
r:32481363 nreturned:10 reslen:2060 17017ms

17037ms Apr  5 16:00:05 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:00:05
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:4255253416419073674 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 52887 locks(micros)
r:32261752 nreturned:10 reslen:2060 17037ms

17083ms Apr  5 16:29:53 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:29:53
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:5345926353689011561 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 48591 locks(micros)
r:32203371 nreturned:10 reslen:2060 17083ms
These 5 queries each took more than 15 seconds, and all look pretty similar. Let's find the slowest queries involving sorting; we'll filter on the string "orderby":

egrep '[0-9]{3,}ms$' mongod.log | grep orderby | awk '{print $NF, $0}' | sort -n | tail -n 5
16872ms Apr  5 16:00:26 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:00:26
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:6213124304229200070 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 51490 locks(micros)
r:32180103 nreturned:10 reslen:2060 16872ms

16965ms Apr  5 15:57:45 m202-ubuntu mongod.27017[808]: Fri Apr  5 15:57:45
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:8343223522342664909 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 48058 locks(micros)
r:32188994 nreturned:10 reslen:2060 16965ms

17017ms Apr  5 16:30:35 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:30:35
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:3380969414085642540 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 52433 locks(micros)
r:32481363 nreturned:10 reslen:2060 17017ms

17037ms Apr  5 16:00:05 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:00:05
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:4255253416419073674 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 52887 locks(micros)
r:32261752 nreturned:10 reslen:2060 17037ms

17083ms Apr  5 16:29:53 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:29:53
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:5345926353689011561 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 48591 locks(micros)
r:32203371 nreturned:10 reslen:2060 17083ms
Are all the sorting queries this slow, or only this one? Let's look for the fastest sorting queries by using head instead of tail:

egrep '[0-9]{3,}ms$' mongod.log | grep orderby | awk '{print $NF, $0}' | sort -n | head -n 5
15753ms Apr  5 16:29:32 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:29:32
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:468013025027691685 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 12113 locks(micros)
r:31142862 nreturned:10 reslen:2060 15753ms

15805ms Apr  5 15:59:24 m202-ubuntu mongod.27017[808]: Fri Apr  5 15:59:24
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:4493330445843070615 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 16742 locks(micros)
r:30448693 nreturned:10 reslen:2060 15805ms

15886ms Apr  5 15:58:45 m202-ubuntu mongod.27017[808]: Fri Apr  5 15:58:45
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:6428655199185527636 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 15215 locks(micros)
r:30567474 nreturned:10 reslen:2060 15886ms

16039ms Apr  5 16:29:13 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:29:13
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:7606044462464616588 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 22861 locks(micros)
r:30670479 nreturned:10 reslen:2060 16039ms

16183ms Apr  5 16:27:48 m202-ubuntu mongod.27017[808]: Fri Apr  5 16:27:48
[conn16030] query serverside.scrum_master query: { $query: { datetime_used: {
$ne: null } }, $orderby: { _id: 1 } } cursorid:4359096396969049572 ntoreturn:10
ntoskip:0 nscanned:7000376 keyUpdates:0 numYields: 24743 locks(micros)
r:31557172 nreturned:10 reslen:2060 16183ms
Even the fastest sorting queries are about this slow.
