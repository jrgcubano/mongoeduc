# Final: Question 1: User Privileges in MongoDB

Spin up a server with --auth and create a user, "roland", who is a userAdminAnyDatabase and who logs in on the admin database with password "12345".

Create user "vespa" who can log into the "testA" database and who has the roles of "read" and "dbAdmin" on database "testA" and "readWrite" on database "testB". Do not give "vespa" any other abilities beyond this on any database. You may use any password you like for vespa.

You may point MongoProc to any host/port you like.

# Solution

```javascript
sudo mongod --auth
```

For user "roland" on "admin" database

```javascript
mongo
use admin
db.createUser({ user : "roland", pwd : "12345", roles : [{role : "userAdminAnyDatabase", db : "admin"}]})
```

For user "vespa" on "testA" database with role "read" and "dbAdmin"
For user "vespa" on "testB" database with role "readWrite

```javascript
mongo
use admin
db.auth({user : "roland", pwd : "12345" });
use testA
db.createUser({user : "vespa", pwd : "12345", roles : [{role : "read", db : "testA"}, {role : "dbAdmin", db : "testA"}, { role : "readWrite", db : "testB" }]})
```
