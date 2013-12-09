var PostsDAO = require('../posts').PostsDAO
  , sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    "use strict";

    var posts = new PostsDAO(db);

    this.displayMainPage = function(req, res, next) {
        "use strict";

        posts.getPosts(10, function(err, results) {
            "use strict";

            if (err) return next(err);

            return res.render('blog_template', {
                title: 'blog homepage',
                username: req.username,
                myposts: results
            });
        });
    }

    this.displayMainPageByTag = function(req, res, next) {
        "use strict";

        var tag = req.params.tag;

        posts.getPostsByTag(tag, 10, function(err, results) {
            "use strict";

            if (err) return next(err);

            return res.render('blog_template', {
                title: 'blog homepage',
                username: req.username,
                myposts: results
            });
        });
    }

    this.displayPostByPermalink = function(req, res, next) {
        "use strict";

        var permalink = req.params.permalink;

        posts.getPostByPermalink(permalink, function(err, post) {
            "use strict";

            if (err) return next(err);

            if (!post) return res.redirect("/post_not_found");

            // init comment form fields for additional comment
            var comment = {'name': req.username, 'body': "", 'email': ""}

            return res.render('entry_template', {
                title: 'blog post',
                username: req.username,
                post: post,
                comment: comment,
                errors: ""
            });
        });
    }

    this.handleNewComment = function(req, res, next) {
        "use strict";
        var name = req.body.commentName;
        var email = req.body.commentEmail;
        var body = req.body.commentBody;
        var permalink = req.body.permalink;

        // Override the comment with our actual user name if found
        if (req.username) {
            name = req.username;
        }

        if (!name || !body) {
            // user did not fill in enough information

            posts.getPostByPermalink(permalink, function(err, post) {
                "use strict";

                if (err) return next(err);

                if (!post) return res.redirect("/post_not_found");

                // init comment form fields for additional comment
                var comment = {'name': name, 'body': "", 'email': ""}

                var errors = "Post must contain your name and an actual comment."
                return res.render('entry_template', {
                    title: 'blog post',
                    username: req.username,
                    post: post,
                    comment: comment,
                    errors: errors
                });
            });

            return;
        }

        // even if there is no logged in user, we can still post a comment
        posts.addComment(permalink, name, email, body, function(err, updated) {
            "use strict";

            if (err) return next(err);

            if (updated == 0) return res.redirect("/post_not_found");

            return res.redirect("/post/" + permalink);
        });
    }

    this.displayPostNotFound = function(req, res, next) {
        "use strict";
        return res.send('Sorry, post not found', 404);
    }

    this.displayNewPostPage = function(req, res, next) {
        "use strict";

        if (!req.username) return res.redirect("/login");

        return res.render('newpost_template', {
            subject: "",
            body: "",
            errors: "",
            tags: "",
            username: req.username
        });
    }

    function extract_tags(tags) {
        "use strict";

        var cleaned = [];

        var tags_array = tags.split(',');

        for (var i = 0; i < tags_array.length; i++) {
            if ((cleaned.indexOf(tags_array[i]) == -1) && tags_array[i] != "") {
                cleaned.push(tags_array[i].replace(/\s/g,''));
            }
        }

        return cleaned
    }

    this.handleNewPost = function(req, res, next) {
        "use strict";

        var title = req.body.subject
        var post = req.body.body
        var tags = req.body.tags

        if (!req.username) return res.redirect("/signup");

        if (!title || !post) {
            var errors = "Post must contain a title and blog entry";
            return res.render("newpost_template", {subject:title, username:req.username, body:post, tags:tags, errors:errors});
        }

        var tags_array = extract_tags(tags)

        // looks like a good entry, insert it escaped
        var escaped_post = sanitize(post).escape();

        // substitute some <br> for the paragraph breaks
        var formatted_post = escaped_post.replace(/\r?\n/g,'<br>');

        posts.insertEntry(title, formatted_post, tags_array, req.username, function(err, permalink) {
            "use strict";

            if (err) return next(err);

            // now redirect to the blog permalink
            return res.redirect("/post/" + permalink)
        });
    }
}

module.exports = ContentHandler;
