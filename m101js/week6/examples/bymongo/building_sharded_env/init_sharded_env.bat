REM  Andrew Erlichson - Original author
REM  Jai Hirsch       - Translated original .sh file to .bat   
REM  10gen
REM  script to start a sharded environment on localhost


echo "del data files for a clean start"

del /Q c:\data\config
del /Q c:\data\shard0
del /Q c:\data\shard1
del /Q c:\data\shard2
del /Q c:\data\config

PING 1.1.1.1 -n 1 -w 5000 >NUL


REM  start a replica set and tell it that it will be a shard0

mkdir c:\data\shard0\rs0
mkdir c:\data\shard0\rs1
mkdir c:\data\shard0\rs2
start mongod --replSet s0 --dbpath c:\data\shard0\rs0 --port 37017  --shardsvr --smallfiles --oplogSize 100
start mongod --replSet s0 --dbpath c:\data\shard0\rs1 --port 37018  --shardsvr --smallfiles --oplogSize 100
start mongod --replSet s0 --dbpath c:\data\shard0\rs2 --port 37019  --shardsvr --smallfiles --oplogSize 100

PING 1.1.1.1 -n 1 -w 5000 >NUL

REM  connect to one server and initiate the set
start mongo --port 37017 --eval "config = { _id: 's0', members:[{ _id : 0, host : 'localhost:37017' },{ _id : 1, host : 'localhost:37018' },{ _id : 2, host : 'localhost:37019' }]};rs.initiate(config)"


REM  start a replicate set and tell it that it will be a shard1
mkdir c:\data\shard1\rs0
mkdir c:\data\shard1\rs1
mkdir c:\data\shard1\rs2


start mongod --replSet s1 --dbpath c:\data\shard1\rs0 --port 47017  --shardsvr --smallfiles --oplogSize 100
start mongod --replSet s1 --dbpath c:\data\shard1\rs1 --port 47018  --shardsvr --smallfiles --oplogSize 100
start mongod --replSet s1 --dbpath c:\data\shard1\rs2 --port 47019  --shardsvr --smallfiles --oplogSize 100

PING 1.1.1.1 -n 1 -w 5000 >NUL

start mongo --port 47017 --eval "config = { _id: 's1', members:[{ _id : 0, host : 'localhost:47017' },{ _id : 1, host : 'localhost:47018' },{ _id : 2, host : 'localhost:47019' }]};rs.initiate(config);"


REM  start a replicate set and tell it that it will be a shard2
mkdir c:\data\shard2\rs0
mkdir c:\data\shard2\rs1
mkdir c:\data\shard2\rs2
start mongod --replSet s2 --dbpath c:\data\shard2\rs0 --port 57017  --shardsvr --smallfiles --oplogSize 100
start mongod --replSet s2 --dbpath c:\data\shard2\rs1 --port 57018  --shardsvr --smallfiles --oplogSize 100
start mongod --replSet s2 --dbpath c:\data\shard2\rs2 --port 57019  --shardsvr --smallfiles --oplogSize 100

PING 1.1.1.1 -n 1 -w 5000 >NUL

start mongo --port 57017 --eval "config = { _id: 's2', members:[{ _id : 0, host : 'localhost:57017' },{ _id : 1, host : 'localhost:57018' },{ _id : 2, host : 'localhost:57019' }]};rs.initiate(config)"



REM  now start 3 config servers

mkdir c:\data\config\config-a
mkdir c:\data\config\config-b
mkdir c:\data\config\config-c
start mongod --dbpath c:\data\config\config-a --port 57040 --configsvr --smallfiles --oplogSize 100
start mongod --dbpath c:\data\config\config-b --port 57041 --configsvr --smallfiles --oplogSize 100
start mongod --dbpath c:\data\config\config-c --port 57042 --configsvr --smallfiles --oplogSize 100

PING 1.1.1.1 -n 1 -w 5000 >NUL

ECHO  now start the mongos on a standard port

start mongos  --configdb localhost:57040,localhost:57041,localhost:57042 

echo "Wait 60 seconds for the replica sets to fully come online"
PING 1.1.1.1 -n 1 -w 60000 >NUL

echo "Connnecting to mongos and enabling sharding"

REM  add shards and enable sharding on the test db
start  mongo  --eval "db.adminCommand( { addshard : 's0/'+'localhost:37017' } );db.adminCommand( { addshard : 's1/'+'localhost:47017' } );db.adminCommand( { addshard : 's2/'+'localhost:57017' } );db.adminCommand({enableSharding: 'test'});db.adminCommand({shardCollection: 'test.grades', key: {student_id:1}});"



