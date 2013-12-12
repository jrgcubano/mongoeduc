# Homework 3.1

Download the students.js file to your computer and import it into your local Mongo instance with this command:
$ mongoimport -d school -c students < students.js
This dataset holds the same type of data as last week's grade collection, but it's modeled differently. You might want to start by inspecting it in the Mongo shell.

Write a program in the language of your choice that will remove the lowest homework score for each student. Since there is a single document for each student containing an array of scores, you will need to update the scores array and remove the homework.

Hint/spoiler: With the new schema, this problem is a lot harder and that is sort of the point. One way is to find the lowest homework in code and then update the scores array with the low homework pruned. If you are struggling with the Python side of this, look at the remove operator, which can remove stuff from a Python list.

To confirm you are on the right track, here are some queries to run after you process the data with the correct answer shown:

Let us count the number of students we have:

> use school
> db.students.count() 
200
Let's see what Demarcus Audette's record looks like:
> db.students.find({_id:100}).pretty()
{
	"_id" : 100,
	"name" : "Demarcus Audette",
	"scores" : [
		{
			"score" : 47.42608580155614,
			"type" : "exam"
		},
		{
			"score" : 44.83416623719906,
			"type" : "quiz"
		},
		{
			"score" : 39.01726616178844,
			"type" : "homework"
		}
	]
}

To verify that you have completed this task correctly, provide the identify of the student with the highest average in the class with following query that uses the aggregation framework. The answer will appear in the _id field of the resulting document.

> db.students.aggregate({'$unwind':'$scores'},{'$group':{'_id':'$_id', 'average':{$avg:'$scores.score'}}}, {'$sort':{'average':-1}}, {'$limit':1})

# Answer
13