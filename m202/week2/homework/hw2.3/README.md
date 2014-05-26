# Homework: Homework 2.3: Memory usage

You are performing an aggregation query with $sort, and are hitting the maximum size limit for in-memory sort. Which of the following might resolve this problem?



(OK) If running MongoDB 2.4, move your system to another machine with more memory

Switch out your HDD for an SSD so that data can be accessed more quickly

Move your system to another machine with a faster CPU

(OK) Add an index for the variable(s) you are using to sort the documents

(OK) If you are not already doing so, include a $match in the pipeline that will reduce the number of documents you are sorting