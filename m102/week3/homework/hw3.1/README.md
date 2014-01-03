# Homework 3.1

Download the file http://media.mongodb.org/zips.json. The example below uses "curl", but you can download with your web browser if you like. ("Zip codes" are the U.S. version of postal codes; they are 5 digits long.) Then import this file into a collection "zips".
$ curl -O http://media.mongodb.org/zips.json

                                 Dload  Upload   Total   Spent    Left  Speed
100 2803k  100 2803k    0     0  1807k      0  0:00:01  0:00:01 --:--:-- 1848k
$
$ # this is just informational for you:
$ md5 zips.json
MD5 (zips.json) = 4854d69c2ac389f334c0abff03d96259
$
$ # now import it ...
After import you will find 29467 documents in your zips collection -- note this is slightly different than the .json file as the zips.json file is a bit noisy in its data and has some duplicate keys (duplicate _id's):
$ mongo
> db.zips.count()
29467
Question: consider the state with the 4th most zip codes in it. How many zip codes does that state have? Use the aggregation framework to query this.

# Solution
db.zips.aggregate([ {$group: {'_id': "$state", 'count': {$sum: 1}}}, {$sort: {'count': -1}}, {$limit: 5}])

# Answer
1458

