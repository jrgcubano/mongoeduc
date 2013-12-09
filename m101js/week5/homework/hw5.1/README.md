# Homework 5.1

Finding the most frequent author of comments on your blog
In this assignment you will use the aggregation framework to find the most frequent author of comments on your blog. We will be using the same dataset as last week. 

Start by downloading the posts.json dataset from last week's homework, found in hw4.tar or hw4.zip. Then import into your blog database as follows:
mongoimport -d blog -c posts --drop < posts.json
To avoid any problems with this homework, please reload the posts.json data using the command above even though there is probably still a version of it in your database. 

Now use the aggregation framework to calculate the author with the greatest number of comments. 

To help you verify your work before submitting, the author with the least comments is Efrain Claw and he commented 384 times. 

Ok, please choose your answer below for the most prolific comment author:


Tonisha Games

Milan Mcgavock

(OK) Mikaela Meidinger 

Dusti Lemmond

Lucinda Vanderburg

Corliss Zuk

# Answer : 

mongoimport -d blog -c posts --drop < posts.json

app.js