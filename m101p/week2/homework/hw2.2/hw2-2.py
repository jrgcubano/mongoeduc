import pymongo
import sys

# connnecto to the db on standard port
connection = pymongo.MongoClient("mongodb://localhost")

db = connection.students                 # attach to db
collection = db.grades         # specify the colllection

try:
	student_id = ""
	iter = collection.find({'type':"homework"}).sort([("student_id",pymongo.ASCENDING), ("score",pymongo.ASCENDING)])
	for item in iter:
		if(item['student_id'] != student_id):
			print item
			student_id = item['student_id']
			collection.remove({'_id': item['_id']})

except:
    print "Error trying to read collection:" + sys.exc_info()[0]

