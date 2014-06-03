# Homework: 5.2: Advantages of pre-splitting

Which of the following are advantages of pre-splitting the data that is being loaded into a sharded cluster, rather than throwing all of the data in and waiting for it to migrate?


Data can get lost during chunk migration

You have more control over the shard key if you split manually

You can have larger chunks if you split manually

(OK) You can decide which shard has which data range initially if you pre-split the data

(OK) Migration takes time, especially when the system is under load
