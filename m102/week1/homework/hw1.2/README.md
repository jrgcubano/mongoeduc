# Homework 1.2

Download the file products.json from education.mongodb.com. Take a look at its content.

Now, import its contents into MongoDB, into a database called "pcat" and a collection called "products". Use the mongoimport utility to do this.

When done, run this query in the mongo shell:
db.products.find({type:"case"}).count()

- Import to db: 
mongoimport -d pcat -c products < products.json

- Answer: 3
