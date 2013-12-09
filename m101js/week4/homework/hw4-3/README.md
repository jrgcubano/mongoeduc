# Homework 4.3

Making the Blog fast
To get started, please download hw4.tar or hw4.zip and unpack file to your computer. Files for this homework should be included with your homework handout. This assignment requires Mongo 2.2 or above.

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
The page that displays blog posts by tag (http://localhost:3000/tag/whatever)
The page that displays a blog entry by permalink (http://localhost:3000/post/permalink)
By fast, we mean that indexes should be in place to satisfy these queries such that we only need to scan the number of documents we are going to return.

To figure out what queries you need to optimize, you can read the code in posts.js and see what queries it is doing to return the data needed for the relevant pages. Isolate those queries and use explain to explore.

Once you have added the indexes to make those pages fast, run the following commands to validate your project just like in previous homeworks.

cd validate
npm install
node hw4-3_validate.js
For those who are using MongoHQ or MongoLab, or just want to run MongoDB on a different host and port, there are some options to the validation script that can be exposed by running:
node hw4-3_validate.js --help
If you got it right, it will provide a validation code for you to enter into the box below. Enter just the code, no spaces.

Note that your blog does NOT need to be running when you run the validator, but your database server does.

To check whether you have added the right index on the posts collection, run
	cd validate
	npm install
	node hw4-3_validate.js
You don't need to have the blog running for validate to succeed.
You might want to look at the blog code to see what queries it does to the posts collection. they need to be fast.
Need to import posts.json.

# Answer:

- File: blog/posts.js

// Get posts (getPosts)
Index: db.posts.ensureIndex({ date : -1})
Query: db.posts.find({date : -1}).limit(10).explain()

// Get posts by tag (getPostsByTag)
Index: db.posts.ensureIndex({ tags : 1,  date : -1})
Query: db.posts.find({tags : 'vietnam'}).sort({ date : -1}).explain()

// Get posts by permalink (getPostByPermalink)
Query: db.posts.find({permalink: "xnafqemtzzcyyzjdegkj"}).explain()
Index: db.posts.ensureIndex({ permalink : 1})
