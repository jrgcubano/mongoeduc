# Homework 4.3

Making the Blog fast
Please download hw4-3.tar (mac) or hw4-3.zip (pc) to get started. This assignment requires Mongo 2.2 or above.

In this homework assignment you will be adding some indexes to the post collection to make the blog fast.

We have provided the full code for the blog application and you don't need to make any changes, or even run the blog. But you can, for fun.

We are also providing a patriotic (if you are an American) data set for the blog. There are 1000 entries with lots of comments and tags. You must load this dataset to complete the problem.

# from the mongo shell
use blog
db.posts.drop()
# from the a mac or PC terminal window
mongoimport -d blog -c posts < posts.json
The blog has been enhanced so that it can also display the top 10 most recent posts by tag. There are hyperlinks from the post tags to the page that displays the 10 most recent blog entries for that tag. (run the blog and it will be obvious)

Your assignment is to make the following blog pages fast:

The blog home page
The page that displays blog posts by tag (http://localhost:8082/tag/whatever)
The page that displays a blog entry by permalink (http://localhost:8082/post/permalink)
By fast, we mean that indexes should be in place to satisfy these queries such that we only need to scan the number of documents we are going to return.
To figure out what queries you need to optimize, you can read the blog.py code and see what it does to display those pages. Isolate those queries and use explain to explore.

Once you have added the indexes to make those pages fast run the following.

python validate.py
(note that for folks who are using MongoLabs or MongoHQ there are some command line options to validate.py to make it possible to use those services) Now enter the validation code below.

# Solution 
File: blog.py
mongoimport -d blog -c posts < posts.json

// Get posts (getPosts)
Index: db.posts.ensureIndex({ date : -1})
Query: db.posts.find({date : -1}).limit(10).explain()
  
// Get posts by tag (getPostsByTag)
Index: db.posts.ensureIndex({ tags : 1,  date : -1})
Query: db.posts.find({tags : 'vietnam'}).sort({ date : -1}).explain()
  
// Get posts by permalink (getPostByPermalink)
Query: db.posts.find({permalink: "xnafqemtzzcyyzjdegkj"}).explain()
Index: db.posts.ensureIndex({ permalink : 1})

# Answer: 
893jfns29f728fn29f20f2
