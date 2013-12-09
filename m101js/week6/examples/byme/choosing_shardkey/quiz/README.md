# Choosing a Shard Key

- Notes:
. Always take in count your access pattern
. You need sufficient cardinality to choose a shard key
. Avoid hotspotting monotonically increassy in writes

- Example:
A photo album:

username (shardkey inmutable)
albums 

(michael) - (john) - (nicolas)
 albums     albums    albums
 
- Question:
You are building a facebook competitor called footbook that will be a mobile social network of feet. You have decided that your primary data structure for posts to the wall will look like this:
{'username':'toeguy',
     'posttime':ISODate("2012-12-02T23:12:23Z"),
     "randomthought": "I am looking at my feet right now",
     'visible_to':['friends','family', 'walkers']}
Thinking about the tradeoffs of shard key selection, select the true statements below.


(OK) Choosing posttime as the shard key will cause hotspotting as time progresses.

(OK) Choosing username as the shard key will distribute posts to the wall well across the shards.

(OK) Choosing visible_to as a shard key is illegal.

Choosing posttime as the shard key suffers from low cardinality
