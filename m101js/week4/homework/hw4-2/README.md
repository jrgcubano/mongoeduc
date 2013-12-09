# Homework 4.2

Suppose you have a collection called tweets whose documents contain information about the created_at time of the tweet and the user's followers_count at the time they issued the tweet. What can you infer from the following explain output?
db.tweets.find({"user.followers_count":{$gt:1000}}).sort({"created_at" : 1 }).limit(10).skip(5000).explain()
{
        "cursor" : "BtreeCursor created_at_-1 reverse",
        "isMultiKey" : false,
        "n" : 10,
        "nscannedObjects" : 46462,
        "nscanned" : 46462,
        "nscannedObjectsAllPlans" : 49763,
        "nscannedAllPlans" : 49763,
        "scanAndOrder" : false,
        "indexOnly" : false,
        "nYields" : 0,
        "nChunkSkips" : 0,
        "millis" : 205,
        "indexBounds" : {
                "created_at" : [
                        [
                                {
                                        "$minElement" : 1
                                },
                                {
                                        "$maxElement" : 1
                                }
                        ]
                ]
        },
        "server" : "localhost.localdomain:27017"
}


(OK) This query performs a collection scan.

(OK) The query uses an index to determine the order in which to return result documents.

The query uses an index to determine which documents match.

The query returns 46462 documents.

(OK) The query visits 46462 documents.

The query is a "covered index query".
