Restoring config servers by Adam
================================
http://dba.stackexchange.com/questions/48232/mongodb-config-servers-not-in-sync

Restoring config servers, particularly if you have had some sort of catastrophic event is tricky, but not impossible. But, before we go any further, a big bold caveat:

BACK UP EVERYTHING

That means taking a back up of all three config servers. I am going to give you some advice, and it is generally correct, but please, please take a back up of every current config server instance before you overwrite/replace anything

As a quick explanation, config servers are not configured as a replica set - each config server instance is supposed to be identical (at least for all the collections that matter) to the others. Hence, any healthy config server can be used to replace a non-healthy config server and you can then follow the tutorial you mentioned to get back to a good config.

The key to recovery is to identify the healthy config server and then use that to replace the others - you then end up with 3 identical config servers.

There is more than one way to do this, they basically fall into three categories:

1) Use the error message

The error message that is printed out actually lets you know which config server it believes is health, though that is not obvious from the messaging. Here's how to read it generically:

ERROR: config servers not in sync! config servers <healthy-server> and <out-of-sync-server> differ
Basically the first one in the list is the healthy one, in your case that would be mongocfg1.testing.com:27000. That is our first candidate for a healthy config database.

2) Use dbhash to compare all three and pick the ones that agree

On each config server switch to the config database using use config, run db.runCommand("dbhash") and compare the hashes for the collections below:

chunks
databases
settings
shards
version
You are looking for two servers that agree, and using that as the basis to determine that the version of the config database on those hosts is basically trustworthy and should be used to seed the rest.

3. Manually inspect the collections in the config database

Finally, take a look at the config database, and pay attention to the collections listed in the second option above. This is a straight judgement call based on your familiarity with your data.

Hopefully all three methods point you at the same host (or hosts). That config server should be used to seed the other two (after you have taken backups so you can go back). That is basically your best bet. Should that fail, then you may want to try one of the other versions (from the backups) - always making sure that when you start them, all three are identical.

Finally, always ensure that all mongos processes are using the same config server string, and that all 3 servers are always listed in the same order on every process - not doing so across all mongos processes can lead to (very) odd results.