# Homework 2.3

How many products have a voice limit? (That is, have a voice field present in the limits array.)

# Solution
db.products.find({"limits.voice":{$exists:true}}).count()

# Answer
3