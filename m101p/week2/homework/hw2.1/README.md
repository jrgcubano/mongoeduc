# Homework 2.1

In this problem, you will be using a collection of student scores that is similar to what we used in the lessons. Please download the grades.js file and import it into your local mongo database as follows:
mongoimport -d students -c grades < grades.js
The dataset contains 4 scores for 200 students.
First, let’s confirm your data is intact; the number of documents should be 800.

> use students
> db.grades.count()
800
This next query, which uses the aggregation framework that we have not taught yet, will tell you the student_id with the highest average score:

> db.grades.aggregate({'$group':{'_id':'$student_id', 'average':{$avg:'$score'}}}, {'$sort':{'average':-1}}, {'$limit':1})
Note: Aggregation requires mongodb 2.2 or above.
The answer, deep in the resulting document, should be student_id 164 with an average of approximately 89.3.

Now it’s your turn to analyze the data set. Find all exam scores greater than or equal to 65. and sort those scores from lowest to highest.
What is the student_id of the lowest exam score above 65?



115

(OK) 22

48

57

87>
