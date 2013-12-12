import decimal
import pymongo
import sys

# connnecto to the db on standard port
connection = pymongo.MongoClient("mongodb://localhost")

db = connection.school           # attach to db
collection = db.students         # specify the colllection

try:
	mins = decimal.Decimal(-1)
	mini = 0
	i = 0
	iter = collection.find({});
	for item in iter:
		mins = 1000
		i = 0
		for value in item['scores']:
			if value['type'] == "homework":				
				score = decimal.Decimal(value['score'])
				if(mins == decimal.Decimal(-1) or score < mins):
					mins = score
					mini = i
			i += 1
		item['scores'].pop(mini)
		collection.save(item)

except:
    print "Error trying to read collection:" + sys.exc_info()[0]