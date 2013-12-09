# Question 5

Suppose your have a collection fubar with the following indexes created:
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"ns" : "test.fubar",
		"name" : "_id_"
	},
	{
		"v" : 1,
		"key" : {
			"a" : 1,
			"b" : 1
		},
		"ns" : "test.fubar",
		"name" : "a_1_b_1"
	},
	{
		"v" : 1,
		"key" : {
			"a" : 1,
			"c" : 1
		},
		"ns" : "test.fubar",
		"name" : "a_1_c_1"
	},
	{
		"v" : 1,
		"key" : {
			"c" : 1
		},
		"ns" : "test.fubar",
		"name" : "c_1"
	},
	{
		"v" : 1,
		"key" : {
			"a" : 1,
			"b" : 1,
			"c" : -1
		},
		"ns" : "test.fubar",
		"name" : "a_1_b_1_c_-1"
	}
]

Now suppose you want to run the following query against the collection.
db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1})
Which of the following indexes could be used by MongoDB to assist in answering the query. Check all that apply.


_id_

(OK) a_1_b_1

(OK) a_1_c_1

(OK) c_1 

(OK) a_1_b_1_c_-1