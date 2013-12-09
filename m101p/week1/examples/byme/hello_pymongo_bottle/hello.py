import bottle
import pymongo

# this is the hander for the default path of the web server

@bottle.route('/')
def index():
	# connect to mongodb
	connection = pymongo.MongoClient('localhost', 27017)

	# attach to test database
	db = connection.test

	# get handle for names collection
	name = db.names

	# find a single document
	item = name.find_one()

	return '<b>Hello %s!</b>' % item['name']

bottle.run(host='localhost', port=8080)