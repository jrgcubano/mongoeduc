import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the test database
db=connection.school
foo = db.students

for i in range(400000, 500000):
   doc = foo.find_one({'student_id' : i})
   print "first score for student ", doc['student_id'],  "is ", doc['scores'][0]['score']
