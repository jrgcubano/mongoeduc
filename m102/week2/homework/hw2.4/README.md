# Homework 2.4

Create an index on the field for. You might want to first run the following to get some context on what is present in that field in the documents of our collection:
db.products.find({},{for:1})
After creating the index, query products that work with an "ac3" phone; that is, "ac3" is present in the product's "for" field.
Q1: How many are there?
Q2: Run an explain plan on the above query. How many records were scanned?
Q3: Was an index used?


Q1: 0

Q1: 1

Q1: 3

(OK) Q1 : 4

Q2 : 1

(OK) Q2 : 4

Q2 : 5

Q2 : 12

Q3 : No

(OK) Q3 : Yes