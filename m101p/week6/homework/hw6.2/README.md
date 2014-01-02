# Homework 6.2

Let's suppose you have a five member replica set and want to assure that writes are committed to the journal and are acknowledged by at least 3 nodes before you proceed forward. What would be the appropriate settings for w and j?


w=1, j=1

(OK) w="majority", j=1

w=3, j=0

w=5, j=1

w=1,j=3