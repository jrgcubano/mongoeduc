<!DOCTYPE html>
<html>
<head>
<title>My Blog</title>
</head>
<body>

%if (username != None):
Welcome {{username}}        <a href="/logout">Logout</a> | <a href="/newpost">New Post</a><p>
%end

<h1>My Blog</h1>

%for post in myposts:
<h2><a href="/post/{{post['permalink']}}">{{post['title']}}</a></h2>
Posted {{post['post_date']}} <i>By {{post['author']}}</i><br>
Comments: 
%if ('comments' in post):
%numComments = len(post['comments'])
%else:
%numComments = 0
%end
<a href="/post/{{post['permalink']}}">{{numComments}}</a>
<hr>
{{!post['body']}}
<p>
<p>
<em>Filed Under</em>: 
%if ('tags' in post):
%for tag in post['tags'][0:1]:
<a href="/tag/{{tag}}">{{tag}}</a>
%for tag in post['tags'][1:]:
, <a href="/tag/{{tag}}">{{tag}}</a>
%end
%end

<p>
%end
</body>
</html>


