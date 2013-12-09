# Failover in the Node.js Driver

db.collection('foo').insert({x:1}, callback);
What will happen if this insert happens during a primary election?


The insert will immediately succeed and the callback will be called

The insert will fail with an error

(OK) The insert will be buffered until the election completes, then the callback will be called after the operation is sent and a response is received

The callback will be called first, then the insert will be buffered until the election completes
