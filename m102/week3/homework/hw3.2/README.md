# Homework 3.2

Use the same zips collection we imported in homework 3.1. You can confirm you have the right data (well, the count of documents at least) via:
> db.zips.count()
29467
Now use the aggregation framework to check the data quality. First let's check how many zip documents have a starting zip code digit of each possible character:
> db.zips.aggregate( 
...   [
...     { $project : { _id : { $substr : ["$_id",0,1] } } } , 
...     { $group : { _id : "$_id", n : {$sum:1} } }
...   ]
... )
{
	"result" : [
		{
			"_id" : "5",
			"n" : 3624
		},
		{
			"_id" : "4",
			"n" : 3387
		},
		{
			"_id" : "6",
			"n" : 3540
		},
        …
Now check in a similar manner the "city" field for its first character. You will find there are cities in the collection that start with a number -- which indicates either a noisy data set or zip codes that have no corresponding city. Let's suppose we want to delete these zip code documents -- the ones that have a numeric city name -- from our data set. Do a remove operation to delete those documents.
After removing the documents indicated above, how many documents remain in the zips collection?

# Solution
db.zips.remove( {"city": { $regex : '^[0-9]'}})

# Answer
29353