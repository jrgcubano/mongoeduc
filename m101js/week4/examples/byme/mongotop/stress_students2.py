import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the test database
db=connection.school2
foo = db.students


for class_id in range(0, 500):
   for i in range(1, 10000):
       doc = foo.find_one({'student_id' : i, 'class_id' : class_id})
       if(doc is not None)
	    print "first score for student ", doc['student_id'],  "in class ", doc['class_id'], "is ", doc['scores'][0]['score']

