# Question 1

Please download the Enron email dataset enron.zip, unzip it and then restore it using mongorestore. It should restore to a collection called "messages" in a database called "enron". Note that this is an abbreviated version of the full corpus. There should be 120,477 documents after restore. 

Inspect a few of the documents to get a basic understanding of the structure. Enron was an American corporation that engaged in a widespread accounting fraud and subsequently failed. 

In this dataset, each document is an email message. Like all Email messages, there is one sender but there can be multiple recipients. 

Construct a query to calculate the number of messages sent by Andrew Fastow, CFO, to Jeff Skilling, the president. Andrew Fastow's email addess was andrew.fastow@enron.com. Jeff Skilling's email was jeff.skilling@enron.com. 

For reference, the number of email messages from Andrew Fastow to John Lavorato (john.lavorato@enron.com) was 1. 


1

(OK) 3

5

7

9

12

# Answer
- mongostore dump 
- app.js
