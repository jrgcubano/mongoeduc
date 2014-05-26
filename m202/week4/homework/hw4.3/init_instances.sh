mongod --replSet m202 --logpath "rs1.log" --dbpath /data/db/rs202/rs1 --port 27017 --smallfiles --oplogSize 100 --fork 
mongod --replSet m202 --logpath "rs2.log" --dbpath /data/db/rs202/rs2 --port 27018 --smallfiles --oplogSize 100 --fork
mongod --replSet m202 --logpath "rs3.log" --dbpath /data/db/rs202/rs3 --port 27019 --smallfiles --oplogSize 100 --fork