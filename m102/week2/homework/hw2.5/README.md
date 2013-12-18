# Homework 2.5

Referring back to 2.4 above, update those products (products that work with an "ac3" phone) and add 2 to the "price" of each of those items. Then, at the shell prompt type:
homework.c()
What is the output?

# Solution
db.products.update({for:"ac3"}, {$inc:{price:2}}, {multi:true});

# Answer
89.5954.5