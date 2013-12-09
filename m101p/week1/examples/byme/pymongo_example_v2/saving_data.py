import pymongo

def main():
	connection = pymongo.MongoClient("mongodb://localhost:27017")

	db = connection.m101p
	people = db.people

	person = {'name':'Barack Obama', 'role':'President',
			  'address':{'address1':'The White House',
			  			  'street': '1600 Pennsylvania Avenue',
			  			  'state': 'DC',
			  			  'city': 'Washington'},
			  	'interests':['government', 'basketball', 'the Middle East']}
	
	people.insert(person)

main()