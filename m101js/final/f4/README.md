# Question 4

Enhancing the Blog to support viewers liking certain comments
In this problem, you will be enhancing the blog project to support users liking certain comments and the like counts showing up the in the permalink page. 

Start by downloading the code in Final4.zip and loading up the blog dataset posts.json. The user interface has already been implemented for you. It's not fancy. The /post URL shows the like counts next to each comment and displays a Like button that you can click on. That Like button POSTS to the /like URL on the blog, makes the necessary changes to the database state (you are implementing this), and then redirects the browser back to the permalink page. 

This full round trip and redisplay of the entire web page is not how you would implement liking in a modern web app, but it makes it easier for us to reason about, so we will go with it. 

Your job is to search the code for the string "XXX work here" and make any necessary changes. You can choose whatever schema you want, but you should note that the entry_template makes some assumptions about the how the like value will be encoded and if you go with a different convention than it assumes, you will need to make some adjustments. 

The validation script does not look at the database. It looks at the blog. 

The validation script, final4-validate.js, will fetch your blog, go to the first post's permalink page and attempt to increment the vote count. You run it as follows:
node final4-validate.js
Remember that the blog needs to be running as well as Mongo. The validation script takes some options if you want to run outside of localhost. 

# Answer:
VQ3jedFjG5VmElLTYKqS

# Solution:
- blog/posts.js/Answer

