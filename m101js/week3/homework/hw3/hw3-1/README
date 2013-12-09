# Homework 3.1

To get started, please download hw3.zip or hw3.tar and unpack file to your computer. You should have included with your homework files a "students.json" file. Import this file into your local Mongo instance with this command:
$ mongoimport -d school -c students < students.json
Write a program in Node.js that will remove the lowest homework score for each student. Since there is a single document for each student containing an array of scores, you will need to update the scores array and remove the homework.

Hint: One way to solve this is to find the lowest homework in code and then update the scores array with the low homework removed. If you are struggling with the Node.js side of this, look at the Array.splice method, which can remove elements from a Javascript Array. Note that you should not use the delete operator, because it will delete the element without resizing the array, leaving an empty space.

To confirm you are on the right track, here are some queries to run after you process the data with the correct answer shown: 

Let us count the number of students we have:

> use school
> db.students.count() 
200
Let's see what Demarcus Audette's record looks like:
>db.students.find({_id:100}).pretty()
{
  "_id" : 100,
  "name" : "Demarcus Audette",
  "scores" : [
    {
      "type" : "exam",
                        "score" : 47.42608580155614
    },
    {
      "type" : "quiz",
                        "score" : 44.83416623719906
    },
    {
      "type" : "homework",
                        "score" : 39.01726616178844
    }
  ]
}

To verify that you have completed this task correctly, provide the identify of the student with the highest average in the class with following query that uses the aggregation framework. The answer will appear in the _id field of the resulting document.

> db.students.aggregate({'$unwind':'$scores'},{'$group':{'_id':'$_id', 'average':{$avg:'$scores.score'}}}, {'$sort':{'average':-1}}, {'$limit':1})

Answer: in app.js

Query to verify result:  
db.students.aggregate({'$unwind':'$scores'},{'$group':{'_id':'$_id', 'average':{$avg:'$scores.score'}}}, {'$sort':{'average':-1}}, {'$limit':1})
 
Result: 13
