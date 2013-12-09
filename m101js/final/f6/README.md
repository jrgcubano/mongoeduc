# Question 6

Suppose you have a collection of students of the following form:
{
	"_id" : ObjectId("50c598f582094fb5f92efb96"),
	"first_name" : "John",
	"last_name" : "Doe",
	"date_of_admission" : ISODate("2010-02-21T05:00:00Z"),
	"residence_hall" : "Fairweather",
	"has_car" : true,
	"student_id" : "2348023902",
	"current_classes" : [
		"His343",
		"Math234",
		"Phy123",
		"Art232"
	]
}

Now suppose that basic inserts into the collection, which only include the last name, first name and student_id, are too slow (we can't do enough of them per second from our program). What could potentially improve the speed of inserts. Check all that apply.


Add an index on last_name, first_name if one does not already exist
(Add more indexes slow down the performance on writes)

(OK) Set w=0, j=0 on writes
(E: Doesn't block the app until the write has finished)

(OK) Remove all indexes from the collection
(E: Not suitable for reads, but speed up the writes)

Provide a hint to MongoDB that it should not use an index for the inserts
(E: Mongo update the index in every insert)

Build a replica set and insert data into the secondary nodes to free up the primary nodes (E: All the nodes contains the same data, so it's the same. But the real answer it that you can't write to secondary nodes)