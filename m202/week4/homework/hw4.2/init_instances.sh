mongod --replSet m202 --logpath "1.log" --dbpath 1 --port 27017 --smallfiles --oplogSize 64 --fork 
mongod --replSet m202 --logpath "2.log" --dbpath 2 --port 27018 --smallfiles --oplogSize 64 --fork
mongod --replSet m202 --logpath "3.log" --dbpath 3 --port 27019 --smallfiles --oplogSize 64 --fork